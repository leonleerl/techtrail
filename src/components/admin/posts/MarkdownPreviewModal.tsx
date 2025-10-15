"use client"

import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  MarkdownRenderer
} from '@/components/ui';
import { Eye } from 'lucide-react';

interface MarkdownPreviewModalProps {
  content: string;
  title?: string;
}

export function MarkdownPreviewModal({ content, title = "Content Preview" }: MarkdownPreviewModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          className="ml-2"
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-2/3 h-[90vh] bg-white overflow-y-auto flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="border rounded-lg p-6 bg-white min-h-[60vh]">
            {content ? (
              <MarkdownRenderer content={content} />
            ) : (
              <div className="text-gray-400 text-center py-8">
                <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No content to preview</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 mt-4 text-sm text-gray-500 border-t pt-4">
          <p>Preview rendered from Markdown content</p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 