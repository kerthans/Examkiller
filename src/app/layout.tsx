// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExamKiller - AI驱动的期末考试助手",
  description: "让AI成为你的私人导师，智能分析考点、生成练习题、定制复习计划，助你轻松应对期末考试",
  keywords: "AI学习助手, 期末考试, 大学生复习, 智能分析, 考试复习, 个性化学习",
  authors: [{ name: "ExamKiller Team" }],
  openGraph: {
    title: "ExamKiller - AI驱动的期末考试助手",
    description: "让AI成为你的私人导师，智能分析考点、生成练习题、定制复习计划",
    type: "website",
    locale: "zh_CN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamKiller - AI驱动的期末考试助手",
    description: "让AI成为你的私人导师，智能分析考点、生成练习题、定制复习计划",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#1E40AF" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-[#FAFAFA] dark:bg-[#121212] transition-colors duration-300`}>
        {/* 页面加载动画 */}
        <div id="page-loader" className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA] dark:bg-[#121212] transition-opacity duration-500">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
        
        <div className="relative min-h-screen">
          {/* 全局背景网格 */}
          <div className="fixed inset-0 pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0h6v60h-6V0zm-48 0h6v60h-6V0zm30 0h6v60h-6V0zM6 0h6v60H6V0zm30 0h6v60h-6V0zM36 0h6v60h-6V0z' fill='%23234' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          {children}
        </div>

        {/* 返回顶部按钮 */}
        <button
          id="back-to-top"
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg opacity-0 transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="返回顶部"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 页面加载完成后隐藏加载动画
              window.addEventListener('load', () => {
                document.getElementById('page-loader').style.opacity = '0';
                setTimeout(() => {
                  document.getElementById('page-loader').style.display = 'none';
                }, 500);
              });

              // 控制返回顶部按钮的显示/隐藏
              const backToTop = document.getElementById('back-to-top');
              let lastScrollY = window.scrollY;
              let ticking = false;

              window.addEventListener('scroll', () => {
                if (!ticking) {
                  window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                      backToTop.style.opacity = '1';
                      backToTop.style.transform = 'translateY(0)';
                    } else {
                      backToTop.style.opacity = '0';
                      backToTop.style.transform = 'translateY(20px)';
                    }
                    lastScrollY = window.scrollY;
                    ticking = false;
                  });
                  ticking = true;
                }
              });

              // 返回顶部功能
              backToTop.addEventListener('click', () => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });

              // 页面过渡动画
              document.addEventListener('DOMContentLoaded', () => {
                document.body.classList.add('page-transition-enter');
                requestAnimationFrame(() => {
                  document.body.classList.add('page-transition-enter-active');
                });
              });

              // 深色模式切换
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }

              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}