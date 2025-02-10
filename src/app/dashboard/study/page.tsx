/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/dashboard/study/page.tsx
"use client";

import { useState } from 'react';
import Sidebar from "@/components/dashboard/sidebar";
import { PDFViewer } from "@/components/study/PDFViewer";
import { OutlineSection } from "@/components/study/OutlineSection";

export default function StudyPage() {
 const [currentPage, setCurrentPage] = useState(1);

 return (
   <div className="flex h-screen bg-zinc-50">
     <Sidebar className="flex-shrink-0 w-64" selectedItem="study" />
     <OutlineSection 
       currentPage={currentPage}
       onPageSelect={setCurrentPage}
     />
     <PDFViewer
       currentPage={currentPage}
       onPageChange={setCurrentPage}
     />
   </div>
 );
}