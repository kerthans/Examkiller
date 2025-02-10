/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/study/PDFViewer.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface PDFViewerProps {
 currentPage: number;
 onPageChange: (page: number) => void;
}

export function PDFViewer({ currentPage, onPageChange }: PDFViewerProps) {
 return (
   <div className="flex-1 flex flex-col">
     <div className="h-14 border-b border-zinc-200 flex items-center justify-between px-4 bg-white">
       <div className="flex items-center gap-2">
         <Button
           variant="outline"
           size="icon"
           onClick={() => onPageChange(Math.max(1, currentPage - 1))}
           disabled={currentPage <= 1}
         >
           <ChevronLeft className="h-4 w-4" />
         </Button>
         <span className="text-sm text-zinc-600 min-w-[60px] text-center">
           第 {currentPage} 页
         </span>
         <Button
           variant="outline"
           size="icon"
           onClick={() => onPageChange(currentPage + 1)}
           disabled={currentPage >= 10}
         >
           <ChevronRight className="h-4 w-4" />
         </Button>
       </div>
     </div>
     <div className="flex-1 overflow-auto p-4 bg-zinc-100">
       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 relative">
         <Image
           src={`/demo/docs/${currentPage}.png`}
           alt={`Page ${currentPage}`}
           width={800}
           height={1200}
           className="w-full h-auto"
           priority
         />
       </div>
     </div>
   </div>
 );
}