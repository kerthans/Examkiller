/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion } from 'framer-motion'
import { 
  Home,
  ArrowLeft,
  RefreshCcw,
  Search,
  MessageCircle,
  Sparkles,
  FileSearch,
  QrCode
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'

const messages = [
  "功能开发中，敬请期待...",
  "内测阶段，加群交流吧！",
  "抢先体验，等你加入...",
  "让我们一起完善这个产品",
  "新功能正在路上..."
]

const features = [
  "智能备考规划",
  "AI习题解析",
  "智能错题本",
  "学习数据分析",
  "多端同步学习",
  "实时学习追踪"
]

const NotFound = () => {
  const [mounted, setMounted] = useState(false)
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const generateRandomPosition = () => ({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600)
  })

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 精致的背景图案 */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015]" />
      
      {/* 漂浮的图形 */}
      {[...Array(12)].map((_, i) => {
        const pos1 = generateRandomPosition()
        const pos2 = generateRandomPosition()
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [pos1.x, pos2.x],
              y: [pos1.y, pos2.y]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              background: `rgba(59, 130, 246, ${Math.random() * 0.1})`
            }}
          />
        )
      })}

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* 动画数字404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <span className="text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600/90 to-blue-400/90 leading-none select-none">
            功能开发中
          </span>
          <motion.div
            className="absolute -right-4 top-4"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FileSearch className="w-12 h-12 text-blue-500/80" />
          </motion.div>
        </motion.div>

        {/* 标题和描述 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-12"
        >
          <h1 className="text-3xl font-bold text-zinc-800">
            {randomMessage}
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            我们正在开发更多激动人心的功能。加入内测群，获取第一手产品资讯，参与产品优化！
          </p>
        </motion.div>

        {/* 功能预览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow-sm border border-zinc-100"
            >
              <p className="text-zinc-600">{feature}</p>
            </div>
          ))}
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="relative group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2"
              >
                <QrCode className="w-4 h-4" />
                加入内测群
                <motion.span
                  className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-blue-600/20 blur-lg transition-opacity"
                  animate={{
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>扫码加入内测交流群</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-square w-full max-w-sm mx-auto mt-4">
                <Image
                  src="/demo/group.png"
                  alt="内测群二维码"
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/" className="contents">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 group"
            >
              <Home className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              返回首页
            </Button>
          </Link>
        </motion.div>

        {/* 联系信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white rounded-2xl shadow-lg shadow-blue-500/5 max-w-lg mx-auto"
        >
          <div className="space-y-2 text-zinc-600">
            <p>📧 商务合作：business@example.com</p>
            <p>💡 功能建议：feedback@example.com</p>
            <p>🤝 加入我们：hr@example.com</p>
          </div>
        </motion.div>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-zinc-500"
        >
          <Sparkles className="w-4 h-4" />
          <span>敬请期待更多精彩功能</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>

      {/* 背景光晕效果 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
    </div>
  )
}

export default NotFound