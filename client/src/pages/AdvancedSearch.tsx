import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, FileText, Filter, Calendar, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Document, DocumentWithRelevance } from "../../../shared/schema";
import { semanticSearch, enhancedSemanticSearch } from "@/lib/openai";
import { DateRange } from "react-day-picker";

export default function AdvancedSearch() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: { from: undefined, to: undefined },
    categories: [] as string[],
    relevanceThreshold: 0.3,
    includeArchived: false,
    searchType: "hybrid" as "semantic" | "keyword" | "hybrid"
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: documents } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    const startTime = Date.now();
    
    try {
      let results;
      
      // Choose search method based on user selection
      if (filters.searchType === "semantic") {
        const response = await semanticSearch(query);
        results = response.results;
      } else if (filters.searchType === "hybrid" && documents) {
        const response = await enhancedSemanticSearch(query, documents);
        results = response.results;
      } else {
        // Basic keyword search as fallback
        results = documents?.filter(doc => 
          doc.title.toLowerCase().includes(query.toLowerCase()) || 
          doc.content?.toLowerCase().includes(query.toLowerCase())
        ).map(doc => ({
          ...doc,
          relevance: 0.7 // Default relevance for keyword matches
        })) || [];
      }
      
      // Apply category filter if any categories are selected
      if (filters.categories.length > 0) {
        results = results.filter(doc => 
          filters.categories.includes(doc.categoryId || "")
        );
      }
      
      // Apply relevance threshold
      results = results.filter(doc => doc.relevance >= filters.relevanceThreshold);
      
      // Sort by relevance
      results = results.sort((a, b) => b.relevance - a.relevance);
      
      const searchDuration = Date.now() - startTime;
      setSearchTime(searchDuration);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => {
      const categories = [...prev.categories];
      const index = categories.indexOf(categoryId);
      
      if (index === -1) {
        categories.push(categoryId);
      } else {
        categories.splice(index, 1);
      }
      
      return { ...prev, categories };
    });
  };

  const handleRelevanceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, relevanceThreshold: value[0] }));
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Advanced Search</h1>
          <p className="text-slate-600">Search across all documents with powerful filtering options</p>
        </div>
        
        {/* Search bar */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input
              className="pl-10 pr-4 py-3 h-12 text-base"
              placeholder="Enter search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            className="h-12 px-6" 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
        
        {/* Filters and search options */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-slate-500" />
                  <CardTitle className="text-lg">Filters</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Date range */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date Range</span>
                  </Label>
                  <DatePickerWithRange 
                    date={filters.dateRange} 
                    setDate={(dateRange) => 
                      setFilters(prev => ({ ...prev, dateRange }))
                    }
                  />
                </div>
                
                {/* Categories */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Tag className="h-4 w-4" />
                    <span>Categories</span>
                  </Label>
                  <div className="space-y-2 pl-1">
                    {categories?.filter(cat => cat.id !== 'all').map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={filters.categories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Relevance threshold */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Minimum Relevance ({Math.round(filters.relevanceThreshold * 100)}%)</span>
                  </Label>
                  <Slider
                    defaultValue={[0.3]}
                    min={0}
                    max={1}
                    step={0.05}
                    value={[filters.relevanceThreshold]}
                    onValueChange={handleRelevanceChange}
                  />
                </div>
                
                {/* Include archived */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-archived"
                    checked={filters.includeArchived}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, includeArchived: !!checked }))
                    }
                  />
                  <label
                    htmlFor="include-archived"
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include archived documents
                  </label>
                </div>
                
                {/* Search type */}
                <div className="space-y-2">
                  <Label>Search Method</Label>
                  <Select
                    value={filters.searchType}
                    onValueChange={(value) => 
                      setFilters(prev => ({ 
                        ...prev, 
                        searchType: value as 'semantic' | 'keyword' | 'hybrid'
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select search type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hybrid">Hybrid (Recommended)</SelectItem>
                      <SelectItem value="semantic">Semantic Only</SelectItem>
                      <SelectItem value="keyword">Keyword Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right content - search results */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 && (
              <div className="mb-4 text-sm text-slate-600">
                Found {searchResults.length} results ({searchTime}ms)
              </div>
            )}
            
            {isSearching ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-slate-50/50">
                    <CardHeader className="pb-2 pt-4">
                      <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-full animate-pulse"></div>
                        <div className="h-3 bg-slate-200 rounded w-full animate-pulse"></div>
                        <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{doc.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <div className="text-xs px-2 py-1 rounded bg-primary-100 text-primary-800">
                          {doc.categoryId || "Uncategorized"}
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-800">
                          Relevance: {Math.round(doc.relevance * 100)}%
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-700 line-clamp-3">
                        {doc.content}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="text-primary-700">
                        <FileText className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No results found</h3>
                <p className="text-slate-600">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Start your search</h3>
                <p className="text-slate-600">
                  Use the search bar and filters to find documents
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}