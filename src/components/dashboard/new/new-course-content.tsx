/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/deshboard/new/new-course-content.tsx
"use client";

import React, { useState } from "react";
import { Upload, FileText, Search, X, Plus, Calendar, Target, Book, PenTool, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/dashboard/sidebar";

interface Material {
  name: string;
  type: string;
  date: string;
  size: string;
}

interface CourseInfo {
  name: string;
  examDate: string;
  examTarget: string;
  description: string;
}

interface FileUploadZoneProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  inputId: string;
}

const recentMaterials: Material[] = [
  { name: "高等数学期末复习重点", type: "PDF", date: "2024-02-08", size: "2.4 MB" },
  { name: "线性代数练习题集", type: "DOCX", date: "2024-02-07", size: "1.8 MB" },
  { name: "概率论公式总结", type: "PDF", date: "2024-02-06", size: "3.2 MB" },
  { name: "高等数学模拟试题", type: "PDF", date: "2024-02-05", size: "4.1 MB" },
  { name: "数学建模案例分析", type: "PPTX", date: "2024-02-04", size: "5.6 MB" },
];

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  inputId 
}) => (
  <div
    className={`
      relative rounded-lg border-2 border-dashed p-6
      transition-colors duration-200 cursor-pointer
      ${isDragging 
        ? "border-blue-500 bg-blue-50" 
        : "border-zinc-200 hover:border-zinc-300"
      }
    `}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    onClick={() => document.getElementById(inputId)?.click()}
  >
    <input
      id={inputId}
      type="file"
      className="hidden"
      multiple
      onChange={(e) => {
        if (e.target.files) {
          const files = Array.from(e.target.files);
          // 处理文件上传
        }
      }}
      accept=".pdf,.doc,.docx,.ppt,.pptx"
    />
    
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-900">
          将{title}拖放到此处或
          <button className="text-blue-600 hover:text-blue-700 mx-1">
            点击上传
          </button>
        </p>
        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  </div>
);

interface FileListProps {
  files: File[];
  removeFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, removeFile }) => (
  <div className="space-y-3">
    {files.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-zinc-400" />
          <div>
            <p className="text-sm font-medium text-zinc-900">{file.name}</p>
            <p className="text-xs text-zinc-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFile(index)}
          className="text-zinc-400 hover:text-zinc-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    ))}
  </div>
);

const NewCourseContent: React.FC = () => {
  const [isDraggingTextbook, setIsDraggingTextbook] = useState(false);
  const [isDraggingExercises, setIsDraggingExercises] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [textbookFiles, setTextbookFiles] = useState<File[]>([]);
  const [exerciseFiles, setExerciseFiles] = useState<File[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    examDate: "",
    examTarget: "",
    description: "",
  });

  const filteredMaterials = recentMaterials.filter(material =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrop = (type: 'textbook' | 'exercise') => (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (type === 'textbook') {
      setIsDraggingTextbook(false);
      setTextbookFiles(prev => [...prev, ...files]);
    } else {
      setIsDraggingExercises(false);
      setExerciseFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (type: 'textbook' | 'exercise') => (index: number) => {
    if (type === 'textbook') {
      setTextbookFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setExerciseFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar className="flex-shrink-0" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">新建课程</h1>
            <p className="mt-2 text-zinc-600">创建新的备考课程，上传课程资料</p>
          </div>

          {/* 主要内容网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧主要区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 课程信息表单 */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-6">课程信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">课程名称</Label>
                    <Input
                      id="courseName"
                      name="name"
                      value={courseInfo.name}
                      onChange={handleInputChange}
                      placeholder="例如：高等数学"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examDate">考试时间</Label>
                    <Input
                      id="examDate"
                      name="examDate"
                      type="date"
                      value={courseInfo.examDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examTarget">考试目标</Label>
                    <Input
                      id="examTarget"
                      name="examTarget"
                      value={courseInfo.examTarget}
                      onChange={handleInputChange}
                      placeholder="例如：90分以上"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">课程描述</Label>
                    <Input
                      id="description"
                      name="description"
                      value={courseInfo.description}
                      onChange={handleInputChange}
                      placeholder="简要描述课程内容和目标"
                    />
                  </div>
                </div>
              </div>

              {/* 教材上传区域 */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">上传教材</h2>
                <FileUploadZone
                  title="教材文件"
                  description="支持 PDF、Word、PPT 格式，单个文件最大 50MB"
                  icon={Book}
                  isDragging={isDraggingTextbook}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingTextbook(true);
                  }}
                  onDragLeave={() => setIsDraggingTextbook(false)}
                  onDrop={handleDrop('textbook')}
                  inputId="textbookInput"
                />
                {textbookFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-zinc-900 mb-3">
                      已选择的教材 ({textbookFiles.length})
                    </h3>
                    <FileList 
                      files={textbookFiles} 
                      removeFile={removeFile('textbook')} 
                    />
                  </div>
                )}
              </div>

              {/* 习题上传区域 */}
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">上传习题</h2>
                <FileUploadZone
                  title="习题文件"
                  description="支持 PDF、Word、PPT 格式，单个文件最大 50MB"
                  icon={PenTool}
                  isDragging={isDraggingExercises}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingExercises(true);
                  }}
                  onDragLeave={() => setIsDraggingExercises(false)}
                  onDrop={handleDrop('exercise')}
                  inputId="exerciseInput"
                />
                {exerciseFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-zinc-900 mb-3">
                      已选择的习题 ({exerciseFiles.length})
                    </h3>
                    <FileList 
                      files={exerciseFiles} 
                      removeFile={removeFile('exercise')} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 右侧最近材料栏 */}
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">最近上传</h2>
                
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="搜索材料..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="space-y-1">
                    {filteredMaterials.map((material, index) => (
                      <div key={index}>
                        <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50">
                          <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 truncate">
                              {material.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {material.date} · {material.size}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        {index < filteredMaterials.length - 1 && (
                          <Separator className="my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline">
              保存草稿
            </Button>
            <Button>
              创建课程
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCourseContent;