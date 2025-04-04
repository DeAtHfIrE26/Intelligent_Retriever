import { useQuery } from "@tanstack/react-query";
import { useDocumentContext } from "@/context/DocumentContext";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Calendar, Tag, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DocumentList() {
  const { 
    activeCategory, 
    searchQuery, 
    searchResults, 
    isSearching, 
    currentDocument, 
    setCurrentDocument 
  } = useDocumentContext();
  
  const { data: documents, isLoading } = useQuery({
    queryKey: ['/api/documents', activeCategory],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/documents?category=${queryKey[1]}`);
      if (!res.ok) throw new Error('Failed to fetch documents');
      return res.json();
    },
    enabled: !searchQuery,
  });
  
  if (isSearching) {
    return (
      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (searchQuery && searchResults?.results.length === 0) {
    return (
      <Card className="bg-white shadow">
        <CardContent className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No results found</h3>
          <p className="mt-1 text-sm text-slate-500">No documents found matching "{searchQuery}"</p>
          <div className="mt-6">
            <Button onClick={() => {
              const input = document.querySelector('input[placeholder="Search documents..."]') as HTMLInputElement;
              if (input) input.value = '';
            }}>
              Clear search
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const displayedDocuments = searchQuery ? searchResults?.results : documents;
  const headerTitle = searchQuery ? 'Search Results' : (activeCategory === 'all' ? 'All Documents' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Documents`);
  const headerSubtitle = searchQuery ? `Found ${searchResults?.results.length} documents matching "${searchQuery}"` : '';
  
  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{headerTitle}</h3>
            {headerSubtitle && (
              <p className="mt-1 text-sm text-slate-500">{headerSubtitle}</p>
            )}
          </div>
          {!searchQuery && (
            <div className="ml-4 mt-2 flex-shrink-0">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Bulk Actions
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="divide-y divide-slate-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="mr-4 h-10 w-10 rounded-md" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <Skeleton className="h-4 w-60 mt-2" />
                <Skeleton className="h-4 w-20 mt-2" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-slate-200">
          {displayedDocuments?.map((doc) => (
            <li key={doc.id}>
              <div 
                onClick={() => setCurrentDocument(doc)}
                className="block hover:bg-slate-50 cursor-pointer"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0 h-10 w-10 rounded-md bg-slate-200 flex items-center justify-center text-slate-500">
                        <FileText className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-primary-600 truncate">{doc.title}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      {searchQuery && (
                        <Badge variant="outline" className="px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                          {Math.round(doc.relevance * 100)}%
                        </Badge>
                      )}
                      {!searchQuery && (
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-500">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-slate-500">
                        <Tag className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400" />
                        {doc.tags?.map((tag, index) => (
                          <span key={index} className="inline-flex items-center">
                            <span>{tag}</span>
                            {index < doc.tags.length - 1 && <span className="mx-1">•</span>}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400" />
                      <p>{new Date(doc.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{doc.preview}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
