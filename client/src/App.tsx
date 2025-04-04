import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AdvancedSearch from "@/pages/AdvancedSearch";
import Documents from "@/pages/Documents";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import UserManagement from "@/pages/UserManagement";
import { DocumentProvider } from "./context/DocumentContext";
import { useEffect } from "react";

// Main Layout that includes sidebar and main content area
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [location] = useLocation();
  
  // Update sidebar state when route changes (on mobile)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Hamburger menu (mobile) */}
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-slate-500 focus:outline-none focus:text-slate-700 lg:hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </button>
              </div>
              
              {/* Logo for mobile only */}
              <div className="lg:hidden flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-slate-900">IntelliDocs</span>
              </div>

              {/* Right: Notifications */}
              <div className="flex items-center">
                <button
                  className="ml-3 text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button
                  className="ml-3 text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <div className="ml-3 relative">
                  <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-semibold">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        )}
      </Route>
      <Route path="/search">
        {() => (
          <MainLayout>
            <AdvancedSearch />
          </MainLayout>
        )}
      </Route>
      <Route path="/documents">
        {() => (
          <MainLayout>
            <Documents />
          </MainLayout>
        )}
      </Route>
      <Route path="/analytics">
        {() => (
          <MainLayout>
            <Analytics />
          </MainLayout>
        )}
      </Route>
      <Route path="/settings">
        {() => (
          <MainLayout>
            <Settings />
          </MainLayout>
        )}
      </Route>
      <Route path="/users">
        {() => (
          <MainLayout>
            <UserManagement />
          </MainLayout>
        )}
      </Route>
      {/* Fallback to 404 */}
      <Route>
        {() => <NotFound />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DocumentProvider>
        <Router />
        <Toaster />
      </DocumentProvider>
    </QueryClientProvider>
  );
}

export default App;
