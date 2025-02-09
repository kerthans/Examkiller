// app/login/page.tsx
"use client"

import { AuthTabs } from "@/components/login/auth-tabs"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 装饰背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 主要内容 */}
      <div className="relative min-h-screen w-full container mx-auto flex items-center justify-center px-4 py-8 lg:px-8">
        <div className="w-full max-w-md">
          {/* 卡片容器 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-900/5 p-6 sm:p-8">
            {/* Logo & 标题 */}
            <div className="text-center space-y-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/20 mb-4">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI学习助手
              </h1>
              <p className="text-gray-500 text-sm">
                智能学习，伴你成长
              </p>
            </div>
            
            {/* 登录/注册表单 */}
            <AuthTabs />
            
            {/* 底部文字 */}
            <div className="mt-8 text-center text-xs">
              <p className="text-gray-500">
                继续使用即表示您同意我们的
                <button className="text-blue-600 hover:text-blue-700 hover:underline mx-1 font-medium">
                  服务条款
                </button>
                和
                <button className="text-blue-600 hover:text-blue-700 hover:underline mx-1 font-medium">
                  隐私政策
                </button>
              </p>
            </div>
          </div>

          {/* 底部装饰 */}
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2024 AI学习助手. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}