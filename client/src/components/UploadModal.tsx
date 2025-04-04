import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { queryClient } from '@/lib/queryClient';
import { Label } from '@/components/ui/label';
import { CloudUpload } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { toast } = useToast();
  const [enableAIIndexing, setEnableAIIndexing] = useState(true);
  const [enableOCR, setEnableOCR] = useState(false);
  const [enableCategorization, setEnableCategorization] = useState(true);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      // Simulate uploading files and processing them
      // In a real app, you would use FormData to upload the files
      
      const promises = Array.from(files).map(async (file) => {
        // Create a mock document from the file
        const document = {
          title: file.name.split('.')[0],
          content: `Content of ${file.name}`,
          preview: `Preview of ${file.name}`,
          categoryId: 'technical', // Default category
          tags: ['Uploaded', 'New'],
          userId: 1
        };
        
        const res = await apiRequest('POST', '/api/documents', document);
        return res.json();
      });
      
      return Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate queries to refetch documents
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      
      toast({
        title: "Files uploaded successfully",
        description: `${files?.length} file(s) have been uploaded and processed.`,
      });
      
      setFiles(null);
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      setFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };
  
  const handleUpload = () => {
    if (files && files.length > 0) {
      uploadMutation.mutate(files);
    } else {
      toast({
        title: "No files selected",
        description: "Please select files to upload.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
            <CloudUpload className="h-6 w-6 text-primary-600" />
          </div>
          <DialogTitle className="text-center">Upload Documents</DialogTitle>
          <p className="text-center text-sm text-slate-500 mt-2">
            Drag and drop files here or click to browse. Supported formats: PDF, DOCX, XLSX, PPTX, TXT, CSV.
          </p>
        </DialogHeader>
        
        <div className="mt-5">
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input 
              type="file" 
              id="file-upload"
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
            />
            <CloudUpload className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-1 text-sm text-slate-500">
              Drag files here or <span className="text-primary-600 font-medium">browse</span>
            </p>
            {files && files.length > 0 && (
              <p className="mt-2 text-sm font-medium text-primary-600">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>
          
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">Advanced Options</span>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Checkbox 
                  id="indexing" 
                  checked={enableAIIndexing}
                  onCheckedChange={(checked) => setEnableAIIndexing(!!checked)}
                />
                <Label htmlFor="indexing" className="ml-3 text-sm text-slate-600">
                  Enable AI-powered semantic indexing
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="ocr" 
                  checked={enableOCR}
                  onCheckedChange={(checked) => setEnableOCR(!!checked)}
                />
                <Label htmlFor="ocr" className="ml-3 text-sm text-slate-600">
                  Apply OCR for scanned documents
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="categorization" 
                  checked={enableCategorization}
                  onCheckedChange={(checked) => setEnableCategorization(!!checked)}
                />
                <Label htmlFor="categorization" className="ml-3 text-sm text-slate-600">
                  Automatic document categorization
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="bg-primary-600 hover:bg-primary-700"
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
