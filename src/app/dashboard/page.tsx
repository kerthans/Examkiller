"use client";

import React from "react"
import Image from "next/image"
import { 
  Search, 
  Target, 
  MessageCircle, 
  Sparkles,
  BookOpen,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/dashboard/sidebar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

const quickStats = [
  {
    label: "已完成课程",
    value: "12",
    icon: BookOpen,
    trend: "+2 本周",
    trendUp: true,
    progress: 85,
  },
  {
    label: "学习进度",
    value: "85%",
    icon: TrendingUp,
    trend: "+5% 本周",
    trendUp: true,
    progress: 85,
  },
  {
    label: "学习时长",
    value: "24h",
    icon: Clock,
    trend: "本周累计",
    trendUp: true,
    progress: 70,
  },
]

const recentCourses = [
  {
    title: "高等数学",
    progress: 85,
    lastStudied: "2小时前",
    category: "数学",
    status: "in-progress",
    nextTask: "微分方程",
  },
  {
    title: "线性代数",
    progress: 60,
    lastStudied: "昨天",
    category: "数学",
    status: "pending",
    nextTask: "特征值与特征向量",
  },
  {
    title: "概率论",
    progress: 45,
    lastStudied: "2天前",
    category: "数学",
    status: "completed",
    nextTask: "随机变量",
  },
] as const

const statusConfig = {
  pending: {
    icon: AlertCircle,
    class: "text-amber-600",
    bg: "bg-amber-50",
  },
  "in-progress": {
    icon: Activity,
    class: "text-blue-600",
    bg: "bg-blue-50",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600",
    bg: "bg-emerald-50",
  },
} as const

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar className="flex-shrink-0" />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="mx-auto mb-6"
              />
              <Sparkles className="absolute -right-8 -top-4 w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-4">
              过考竟如此简单
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              专业的考试备考资料生成平台，助你轻松备考
            </p>
          </div>

          {/* Search and Generate Section */}
          <div className="max-w-2xl mx-auto space-y-6 mb-12">
            <div className="relative">
              <Input
                type="search"
                placeholder="搜索课程..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white
                  border-zinc-200/80 focus:border-blue-500 focus:ring focus:ring-blue-100 
                  shadow-sm hover:shadow-md transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            </div>

            <div className="relative">
              <HoverCard openDelay={200} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 
                      hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl 
                      flex items-center justify-center gap-3 shadow-sm hover:shadow-md
                      transition-all duration-200"
                  >
                    <span className="font-medium text-lg">生成备考资料</span>
                    <Target className="w-5 h-5" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent 
                  className="w-80 p-4 shadow-lg border-none bg-white"
                  side="bottom"
                  align="center"
                  sideOffset={5}
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-zinc-900">智能备考资料生成</h4>
                    <p className="text-sm text-zinc-600">
                      基于AI技术，根据您的学习进度和薄弱环节，智能生成个性化备考资料。
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white
                  border border-zinc-100 hover:border-zinc-200 
                  shadow-sm hover:shadow-md
                  transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-50">
                      <stat.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-600">
                      {stat.label}
                    </h3>
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
                
                <div className="relative mb-4">
                  <div className="text-3xl font-bold text-zinc-900">
                    {stat.value}
                  </div>
                  <div className="mt-2 h-2 bg-zinc-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out
                        group-hover:brightness-110"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Courses */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-900">最近课程</h2>
              <Button variant="ghost" className="text-zinc-600 hover:text-zinc-900">
                查看全部 <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCourses.map((course, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white
                    border border-zinc-100 hover:border-zinc-200
                    shadow-sm hover:shadow-md
                    transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {course.title}
                    </h3>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                        statusConfig[course.status].bg,
                        statusConfig[course.status].class
                      )}
                    >
                      {React.createElement(statusConfig[course.status].icon, {
                        className: "w-3.5 h-3.5"
                      })}
                      {course.status === "in-progress" ? "进行中" : 
                       course.status === "completed" ? "已完成" : "待开始"}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-zinc-600">学习进度</span>
                        <span className="font-medium text-zinc-900">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-zinc-50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out
                            group-hover:brightness-110"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-zinc-600">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {course.lastStudied}
                      </div>
                      <Badge variant="secondary" className="bg-zinc-50 text-zinc-600">
                        {course.category}
                      </Badge>
                    </div>

                    <div className="pt-4 border-t border-zinc-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600">下一个任务</span>
                        <span className="font-medium text-zinc-900">{course.nextTask}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="fixed bottom-8 right-8">
          <Button
            variant="ghost"
            size="lg"
            className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]
              hover:bg-white hover:scale-105 border-none
              rounded-xl gap-2 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span className="text-zinc-800">反馈问题</span>
          </Button>
        </div>
        </div>
      </main>
    </div>
  )
}