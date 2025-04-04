import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { useDocumentContext } from "@/context/DocumentContext";
import { X, Home, Search, FileText, PieChart, User, Settings, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { activeCategory, setActiveCategory } = useDocumentContext();
  const [location] = useLocation();
  
  interface Category {
    id: string;
    name: string;
    count: number;
  }
  
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">IntelliDocs</span>
            </div>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Sidebar content */}
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main</h3>
              <div className="mt-2 space-y-1">
                <Link href="/">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      setActiveCategory('all');
                      if (onClose && isActive('/')) onClose();
                    }}
                  >
                    <Home className={`h-5 w-5 mr-3 ${isActive('/') ? 'text-primary-500' : 'text-slate-400'}`} />
                    Dashboard
                  </Button>
                </Link>
                
                <Link href="/search">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/search') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      if (onClose && isActive('/search')) onClose();
                    }}
                  >
                    <Search className={`h-5 w-5 mr-3 ${isActive('/search') ? 'text-primary-500' : 'text-slate-400'}`} />
                    Advanced Search
                  </Button>
                </Link>
                
                <Link href="/documents">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/documents') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      if (onClose && isActive('/documents')) onClose();
                    }}
                  >
                    <FileText className={`h-5 w-5 mr-3 ${isActive('/documents') ? 'text-primary-500' : 'text-slate-400'}`} />
                    Documents
                  </Button>
                </Link>
                
                <Link href="/analytics">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/analytics') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      if (onClose && isActive('/analytics')) onClose();
                    }}
                  >
                    <PieChart className={`h-5 w-5 mr-3 ${isActive('/analytics') ? 'text-primary-500' : 'text-slate-400'}`} />
                    Analytics
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Document Categories */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</h3>
              {isLoading ? (
                <div className="mt-2 space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-8 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  {categories?.map((category) => (
                    <Link key={category.id} href="/">
                      <Button
                        variant="ghost"
                        className={`w-full justify-between px-3 py-2 text-sm font-medium rounded-md ${
                          activeCategory === category.id ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                        onClick={() => {
                          setActiveCategory(category.id);
                          if (onClose) onClose();
                        }}
                      >
                        <span>{category.name}</span>
                        <Badge variant="outline" className="ml-auto bg-slate-200 text-slate-600 py-0.5 px-2 rounded-full text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Admin */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</h3>
              <div className="mt-2 space-y-1">
                <Link href="/users">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/users') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      if (onClose && isActive('/users')) onClose();
                    }}
                  >
                    <User className={`h-5 w-5 mr-3 ${isActive('/users') ? 'text-primary-500' : 'text-slate-400'}`} />
                    User Management
                  </Button>
                </Link>
                
                <Link href="/settings">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/settings') ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => {
                      if (onClose && isActive('/settings')) onClose();
                    }}
                  >
                    <Settings className={`h-5 w-5 mr-3 ${isActive('/settings') ? 'text-primary-500' : 'text-slate-400'}`} />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-200">
          <Link href="/settings">
            <div className="flex items-center group hover:bg-slate-50 rounded-md p-2 -m-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
