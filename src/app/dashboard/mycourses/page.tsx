/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { 
  BookOpen, 
  Clock, 
  Star, 
  TrendingUp, 
  CalendarDays,
  Filter,
  Search,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/dashboard/sidebar";

const stats = [
  {
    name: "在学课程",
    value: "5",
    icon: BookOpen,
    trend: "+1 本周",
    trendUp: true,
  },
  {
    name: "累计学时",
    value: "126h",
    icon: Clock,
    trend: "+12h 本周",
    trendUp: true,
  },
  {
    name: "平均分数",
    value: "88",
    icon: Star,
    trend: "+3 本周",
    trendUp: true,
  },
  {
    name: "完成率",
    value: "92%",
    icon: TrendingUp,
    trend: "+5% 本周",
    trendUp: true,
  },
];

const courses = [
  {
    id: 1,
    name: "高等数学",
    description: "同济版 第七版",
    progress: 85,
    lastStudied: "2小时前",
    examDate: "2024-03-02",
    status: "进行中",
    statusColor: "bg-blue-500",
    materials: 12,
    timeSpent: "24h",
  },
  {
    id: 2,
    name: "线性代数",
    description: "北京大学出版社",
    progress: 65,
    lastStudied: "昨天",
    examDate: "2024-03-15",
    status: "进行中",
    statusColor: "bg-blue-500",
    materials: 8,
    timeSpent: "16h",
  },
  {
    id: 3,
    name: "概率论",
    description: "浙江大学出版社",
    progress: 45,
    lastStudied: "3天前",
    examDate: "2024-04-10",
    status: "计划中",
    statusColor: "bg-amber-500",
    materials: 6,
    timeSpent: "8h",
  },
  {
    id: 4,
    name: "微积分",
    description: "清华大学出版社",
    progress: 100,
    lastStudied: "1周前",
    examDate: "2024-01-15",
    status: "已完成",
    statusColor: "bg-emerald-500",
    materials: 15,
    timeSpent: "32h",
  },
];

export default function MyCoursesContent() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar className="flex-shrink-0" selectedItem="mycourses" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* 页面标题 */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">我的课程</h1>
              <p className="mt-2 text-zinc-600">管理和追踪你的学习进度</p>
            </div>
            <Button className="gap-2">
              <BookOpen className="w-4 h-4" />
              添加课程
            </Button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <stat.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{stat.name}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "font-medium",
                        stat.trendUp ? "text-emerald-600 bg-emerald-50" : "text-zinc-600 bg-zinc-50"
                      )}
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-zinc-900">
                    {stat.value}
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            ))}
          </div>

          {/* 过滤和搜索 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input
                placeholder="搜索课程..."
                className="pl-9 pr-4"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                筛选
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    排序方式
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>最近学习</DropdownMenuItem>
                  <DropdownMenuItem>进度优先</DropdownMenuItem>
                  <DropdownMenuItem>考试日期</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 课程列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1 group-hover:text-blue-600 transition-colors">
                        {course.name}
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>课程操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑信息</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">删除课程</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">学习进度</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.lastStudied}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <CalendarDays className="w-4 h-4" />
                      <span>考试：{course.examDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", course.statusColor)} />
                      <span className="text-sm font-medium">{course.status}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-blue-600 hover:text-blue-700">
                      继续学习
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}