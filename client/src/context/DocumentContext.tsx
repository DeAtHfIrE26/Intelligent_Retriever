import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { performHybridSearch } from "@/lib/utils/search";
import { Document, DocumentWithRelevance, SearchResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface DocumentContextProps {
  documents: Document[];
  currentDocument: Document | null;
  setCurrentDocument: (document: Document | null) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult | null;
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Clear search results when changing category
  useEffect(() => {
    setSearchQuery("");
    setSearchResults(null);
  }, [activeCategory]);
  
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const results = await performHybridSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "There was an error performing your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <DocumentContext.Provider value={{
      documents,
      currentDocument,
      setCurrentDocument,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      performSearch,
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocumentContext must be used within a DocumentProvider");
  }
  return context;
}
