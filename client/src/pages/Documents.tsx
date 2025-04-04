import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  FileText, Filter, ArrowUpDown, MoreHorizontal, 
  Tag, Clock, Calendar, Download, Trash, Edit, Eye, 
  Share2, BookmarkPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Document, Category } from "../../../shared/schema";
import UploadModal from "@/components/UploadModal";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<{ field: string; direction: 'asc' | 'desc' }>({ 
    field: "createdAt", 
    direction: "desc" 
  });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Filter documents based on active tab and search query
  const filteredDocuments = documents?.filter(doc => {
    // Filter by tab (category)
    if (activeTab !== "all" && doc.categoryId !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(query) || 
        (doc.content && doc.content.toLowerCase().includes(query)) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  }) || [];

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a: Document, b: Document) => {
    const { field, direction } = sortBy;
    const modifier = direction === 'asc' ? 1 : -1;
    
    switch (field) {
      case 'title':
        return modifier * a.title.localeCompare(b.title);
      case 'category':
        return modifier * (a.categoryId || '').localeCompare(b.categoryId || '');
      case 'createdAt':
        return modifier * ((new Date(a.createdAt || 0)).getTime() - (new Date(b.createdAt || 0)).getTime());
      default:
        return 0;
    }
  });

  const toggleSort = (field: string) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleSelectAll = () => {
    if (selectedDocuments.length === sortedDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(sortedDocuments.map(doc => doc.id));
    }
  };

  const toggleSelectDocument = (id: number) => {
    setSelectedDocuments(prev => {
      if (prev.includes(id)) {
        return prev.filter(docId => docId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedDocuments.length === 0) return;
    
    toast({
      title: "Bulk Action",
      description: `${action} ${selectedDocuments.length} document(s)`,
    });
    
    // Reset selection after action
    setSelectedDocuments([]);
  };

  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return "Uncategorized";
    const category = categories?.find((c: Category) => c.id === categoryId);
    return category?.name || "Uncategorized";
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setUploadModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Upload Document
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          {/* Tab navigation */}
          <div className="border-b border-slate-200">
            <ScrollArea className="whitespace-nowrap">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="px-4">
                  <TabsList className="h-14">
                    <TabsTrigger value="all" className="data-[state=active]:border-primary-500 relative px-4">
                      All Documents
                      <Badge className="ml-2 bg-slate-100 text-slate-800">{documents?.length || 0}</Badge>
                    </TabsTrigger>
                    
                    {categories?.filter((cat: Category) => cat.id !== 'all').map((category: Category) => (
                      <TabsTrigger 
                        key={category.id}
                        value={category.id}
                        className="data-[state=active]:border-primary-500 relative px-4"
                      >
                        {category.name}
                        <Badge className="ml-2 bg-slate-100 text-slate-800">{category.count}</Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </ScrollArea>
          </div>
          
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  className="pl-10 py-2"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Date added</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="h-4 w-4 mr-2" />
                      <span>Category</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Last 7 days</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Last 30 days</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Last 90 days</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => toggleSort('title')}>
                      <span>Title</span>
                      {sortBy.field === 'title' && (
                        <ArrowUpDown className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleSort('category')}>
                      <span>Category</span>
                      {sortBy.field === 'category' && (
                        <ArrowUpDown className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleSort('createdAt')}>
                      <span>Date added</span>
                      {sortBy.field === 'createdAt' && (
                        <ArrowUpDown className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('Download')}
                      disabled={selectedDocuments.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span>Download selected</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('Archive')}
                      disabled={selectedDocuments.length === 0}
                    >
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      <span>Archive selected</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('Delete')}
                      disabled={selectedDocuments.length === 0}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      <span>Delete selected</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Documents table */}
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={selectedDocuments.length === sortedDocuments.length && sortedDocuments.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all documents"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Loading state
                    Array(5).fill(0).map((_, index) => (
                      <TableRow key={index}>
                        {Array(6).fill(0).map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <div className="h-4 bg-slate-100 rounded animate-pulse w-full max-w-[200px]" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : sortedDocuments.length > 0 ? (
                    // Documents list
                    sortedDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => toggleSelectDocument(doc.id)}
                            aria-label={`Select ${doc.title}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                            <span className="truncate max-w-[300px]">{doc.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">
                            {getCategoryName(doc.categoryId)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags?.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-primary-50 text-primary-700">
                                {tag}
                              </Badge>
                            ))}
                            {(doc.tags?.length || 0) > 3 && (
                              <Badge variant="outline" className="bg-slate-100">
                                +{(doc.tags?.length || 0) - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(doc.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  <span>Download</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="h-4 w-4 mr-2" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    // Empty state
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="h-8 w-8 text-slate-400 mb-2" />
                          <p className="text-slate-500 mb-2">No documents found</p>
                          <Button 
                            variant="outline" 
                            className="text-primary-600"
                            onClick={() => setUploadModalOpen(true)}
                          >
                            Upload a document
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload modal */}
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
}