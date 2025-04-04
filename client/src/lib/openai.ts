import { apiRequest } from "./queryClient";

// Use server-side API endpoints instead of client-side OpenAI usage
// This is more secure as it doesn't expose the API key in the browser
// We're using API endpoints configured in server/routes.ts

// Function to perform semantic search with text embeddings
export async function semanticSearch(query: string) {
  try {
    // Call to backend API that performs semantic search
    const response = await apiRequest("GET", `/api/search?q=${encodeURIComponent(query)}`, undefined);
    return await response.json();
  } catch (error) {
    console.error("Error in semantic search:", error);
    throw error;
  }
}

// Function to analyze documents and extract key information
export async function analyzeDocument(documentText: string) {
  try {
    // Call to backend API that performs document analysis
    const response = await apiRequest("POST", "/api/ai/analyze-document", {
      text: documentText
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw error;
  }
}

// Function to automatically generate tags for a document
export async function generateTags(documentText: string) {
  try {
    // Call server-side API
    const response = await apiRequest("POST", "/api/ai/generate-tags", {
      text: documentText
    });
    const result = await response.json();
    return result.tags || [];
  } catch (error) {
    console.error("Error generating tags:", error);
    throw error;
  }
}

// Function to categorize a document
export async function categorizeDocument(documentText: string, title: string) {
  try {
    // Call server-side API
    const response = await apiRequest("POST", "/api/ai/categorize", {
      text: documentText,
      title: title
    });
    const result = await response.json();
    return result.category || "technical";
  } catch (error) {
    console.error("Error categorizing document:", error);
    throw error;
  }
}

// Function to perform hybrid semantic search (combines keyword and semantic search)
export async function enhancedSemanticSearch(query: string, documents: any[]) {
  try {
    // First, check if we have any documents to search
    if (!documents || documents.length === 0) {
      return { results: [], took: 0 };
    }

    // Call server-side AI-powered semantic search
    const response = await apiRequest("POST", "/api/ai/semantic-search", {
      query,
      documents
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in enhanced semantic search:", error);
    
    // Fallback basic keyword search using client-side logic
    const startTime = Date.now();
    const results = documents
      .map(doc => ({
        ...doc,
        relevance: calculateBasicRelevance(doc, query)
      }))
      .filter(doc => doc.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);
    
    return {
      results,
      took: Date.now() - startTime
    };
  }
}

// Basic relevance calculation as fallback
function calculateBasicRelevance(document: any, query: string): number {
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Title match is heavily weighted
  if (document.title.toLowerCase().includes(queryLower)) {
    score += 0.5;
  }
  
  // Content/preview match
  if ((document.content || document.preview || "").toLowerCase().includes(queryLower)) {
    score += 0.3;
  }
  
  // Tag matches
  if (document.tags) {
    const tagMatches = document.tags.filter((tag: string) => 
      tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase())
    ).length;
    
    score += tagMatches * 0.1;
  }
  
  // Normalize score between 0 and 0.99
  return Math.min(0.99, score);
}
