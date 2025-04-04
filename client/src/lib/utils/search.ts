import { semanticSearch, enhancedSemanticSearch } from "../openai";
import { type DocumentWithRelevance } from "@shared/schema";
import { apiRequest } from "../queryClient";

// Function to perform hybrid search using both traditional and AI-powered methods
export async function performHybridSearch(query: string): Promise<{
  results: DocumentWithRelevance[];
  took: number;
  reasoning?: string;
}> {
  try {
    const startTime = performance.now();
    
    // First try the backend semantic search
    try {
      const searchResults = await semanticSearch(query);
      const endTime = performance.now();
      return {
        results: searchResults.results,
        took: endTime - startTime
      };
    } catch (backendError) {
      console.warn("Backend search failed, falling back to client-side search:", backendError);
      
      // If backend search fails, fall back to client-side enhanced search
      // First, get all documents
      const response = await apiRequest("GET", "/api/documents", undefined);
      const documents = await response.json();
      
      // Then perform client-side semantic search using OpenAI
      const enhancedResults = await enhancedSemanticSearch(query, documents);
      
      const endTime = performance.now();
      return {
        results: enhancedResults.results,
        took: endTime - startTime,
        reasoning: enhancedResults.reasoning
      };
    }
  } catch (error) {
    console.error("Error in hybrid search:", error);
    throw error;
  }
}

// Function to highlight matching terms in document content
export function highlightMatches(text: string, query: string): string {
  if (!query || !query.trim() || !text) return text;
  
  // Split query into individual terms, ignoring very short words
  const queryTerms = query.toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 2)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape regex special chars
  
  if (queryTerms.length === 0) return text;
  
  let highlightedText = text;
  
  // Create a single regex to match any of the terms
  const combinedRegex = new RegExp(`(${queryTerms.join('|')})`, 'gi');
  highlightedText = highlightedText.replace(combinedRegex, '<mark>$1</mark>');
  
  return highlightedText;
}

// Enhanced function to extract a relevant context snippet around matched terms
export function extractRelevantSnippet(text: string, query: string, maxLength = 200): string {
  if (!query || !query.trim() || !text) return text.substring(0, maxLength) + "...";
  
  const queryTerms = query.toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 2);
  
  if (queryTerms.length === 0) return text.substring(0, maxLength) + "...";
  
  // Find the first occurrence of any search term
  const textLower = text.toLowerCase();
  let bestPosition = -1;
  let bestTerm = "";
  
  queryTerms.forEach(term => {
    const position = textLower.indexOf(term);
    if (position !== -1 && (bestPosition === -1 || position < bestPosition)) {
      bestPosition = position;
      bestTerm = term;
    }
  });
  
  if (bestPosition === -1) {
    // No match found, return beginning of text
    return text.substring(0, maxLength) + "...";
  }
  
  // Calculate start and end positions for the snippet
  const snippetLength = maxLength;
  const termLength = bestTerm.length;
  
  // Try to center the match in the snippet
  let start = Math.max(0, bestPosition - (snippetLength - termLength) / 2);
  const end = Math.min(text.length, start + snippetLength);
  
  // Adjust start to not cut off in the middle of a word
  if (start > 0) {
    const prevSpacePos = text.lastIndexOf(" ", start);
    if (prevSpacePos !== -1 && start - prevSpacePos < 20) {
      start = prevSpacePos + 1;
    }
  }
  
  // Create the snippet
  let snippet = text.substring(start, end);
  
  // Add ellipsis if necessary
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet += "...";
  
  return snippet;
}

// Advanced relevance calculation using multiple factors
export function calculateRelevance(document: any, query: string): number {
  if (!query || !document) return 0;
  
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 2);
  
  if (queryTerms.length === 0) return 0.5; // Default mediocre score
  
  let score = 0;
  const titleLower = (document.title || "").toLowerCase();
  const contentLower = (document.content || document.preview || "").toLowerCase();
  
  // Title match is heavily weighted
  if (titleLower.includes(queryLower)) {
    // Exact phrase match in title
    score += 0.6;
  } else {
    // Individual term matches in title
    const titleMatches = queryTerms.filter(term => titleLower.includes(term)).length;
    if (titleMatches > 0) {
      score += 0.4 * (titleMatches / queryTerms.length);
    }
  }
  
  // Content match
  if (contentLower.includes(queryLower)) {
    // Exact phrase match in content
    score += 0.3;
  } else {
    // Individual term matches in content
    const contentMatches = queryTerms.filter(term => contentLower.includes(term)).length;
    if (contentMatches > 0) {
      score += 0.2 * (contentMatches / queryTerms.length);
    }
  }
  
  // Tag matches
  if (document.tags && Array.isArray(document.tags)) {
    const tagsLower = document.tags.map((tag: string) => tag.toLowerCase());
    
    // Check for tag matches
    const tagMatches = queryTerms.filter(term => 
      tagsLower.some((tag: string) => tag.includes(term) || term.includes(tag))
    ).length;
    
    if (tagMatches > 0) {
      score += 0.2 * (tagMatches / queryTerms.length);
    }
  }
  
  // Category match
  if (document.categoryId && queryLower.includes(document.categoryId.toLowerCase())) {
    score += 0.1;
  }
  
  // Recent documents get a small boost
  if (document.updatedAt) {
    const now = new Date();
    const updatedAt = new Date(document.updatedAt);
    const daysDiff = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysDiff < 30) {
      score += 0.05 * (1 - daysDiff / 30);
    }
  }
  
  // Normalize score between 0.1 and 0.99
  return Math.min(0.99, Math.max(0.1, score));
}
