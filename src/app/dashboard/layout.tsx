// src/app/dashboard/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - 过考竟如此简单",
  description: "专业的考试备考资料生成平台",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {children}
    </div>
  )
}