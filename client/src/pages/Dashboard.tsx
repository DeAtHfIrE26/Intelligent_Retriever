import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DocumentList from "@/components/DocumentList";
import DocumentPreview from "@/components/DocumentPreview";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import ActivityLog from "@/components/ActivityLog";
import SearchBar from "@/components/SearchBar";
import StatsCards from "@/components/StatsCards";
import UploadModal from "@/components/UploadModal";
import { useDocumentContext } from "@/context/DocumentContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnalyticsData, FormattedActivityLog } from "../../../shared/schema";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { currentDocument, activeCategory } = useDocumentContext();

  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics'],
  });

  const { data: activityLogs, isLoading: isLoadingActivity } = useQuery<FormattedActivityLog[]>({
    queryKey: ['/api/activity'],
  });

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
        <header className="bg-white border-b border-slate-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Hamburger menu (mobile) */}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-slate-500 focus:outline-none focus:text-slate-700 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Center: Search */}
              <div className="flex-1 flex items-center justify-center lg:justify-end">
                <SearchBar />
              </div>
              
              {/* Right: Actions */}
              <div className="ml-4 flex items-center md:ml-6">
                <Button 
                  onClick={() => setUploadModalOpen(true)}
                  className="ml-3 bg-primary-600 hover:bg-primary-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload
                </Button>
                
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-3 text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          {/* Dashboard header */}
          <div className="pb-5 border-b border-slate-200 sm:flex sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Document Repository</h1>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <div className="flex rounded-md shadow-sm">
                <Button variant="outline" className="px-4 py-2 rounded-l-md border border-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filters
                </Button>
                <Button variant="outline" className="px-4 py-2 border-t border-b border-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>
                  Sort
                </Button>
                <Button variant="outline" className="px-4 py-2 rounded-r-md border border-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                  More
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          {isLoadingAnalytics ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <StatsCards analytics={analyticsData || {
              documentsIndexed: 0,
              searchesPerformed: 0,
              averageQueryTime: '0ms'
            }} />
          )}
          
          {/* Main grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Document list */}
            <div className="lg:col-span-2">
              <DocumentList />
            </div>
            
            {/* Right sidebar */}
            <div>
              {currentDocument ? (
                <DocumentPreview />
              ) : (
                <>
                  {/* Activity */}
                  {isLoadingActivity ? (
                    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                      <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-start mb-4">
                            <Skeleton className="h-8 w-8 rounded-md mr-3" />
                            <div className="flex-1">
                              <Skeleton className="h-4 w-3/4 mb-2" />
                              <Skeleton className="h-3 w-1/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ActivityLog activities={activityLogs || []} />
                  )}
                  
                  {/* Analytics chart */}
                  {isLoadingAnalytics ? (
                    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                      <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <Skeleton className="h-48 w-full mb-4" />
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center justify-between mb-2">
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-2 w-1/4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <AnalyticsPanel analytics={analyticsData || {
                      topSearchTerms: [],
                      usageOverTime: []
                    }} />
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Upload modal */}
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
}
