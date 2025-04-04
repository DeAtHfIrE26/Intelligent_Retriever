import { useDocumentContext } from "@/context/DocumentContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Edit, Download, Share, Info } from "lucide-react";

export default function DocumentPreview() {
  const { currentDocument, setCurrentDocument } = useDocumentContext();
  
  if (!currentDocument) return null;
  
  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-slate-200">
        <h3 className="text-lg leading-6 font-medium text-slate-900">{currentDocument.title}</h3>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentDocument(null)} 
          className="text-slate-400 hover:text-slate-500"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="px-4 py-5 sm:p-6 min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Badge variant="outline" className="bg-primary-100 text-primary-800">Preview</Badge>
            <span className="ml-2 text-sm text-slate-500">
              Updated {new Date(currentDocument.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-500">
              <Edit className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-500">
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-500">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">{currentDocument.content}</p>
        
        {/* AI-Powered insights */}
        <div className="mt-6 p-4 bg-violet-50 rounded-md border border-violet-100">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <h4 className="text-sm font-semibold text-violet-800">AI-Powered Insights</h4>
          </div>
          <ul className="text-xs text-slate-700 space-y-2">
            <li className="flex items-start">
              <Info className="h-4 w-4 text-violet-600 mr-2 mt-0.5" />
              <span>This document has been accessed 28 times in the last month.</span>
            </li>
            <li className="flex items-start">
              <Info className="h-4 w-4 text-violet-600 mr-2 mt-0.5" />
              <span>Related documents: "Implementation Strategies" and "Technical Documentation Guide".</span>
            </li>
            <li className="flex items-start">
              <Info className="h-4 w-4 text-violet-600 mr-2 mt-0.5" />
              <span>Key topics: {currentDocument.tags?.slice(0, 3).join(', ')}</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-6 flex flex-col space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {currentDocument.tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
