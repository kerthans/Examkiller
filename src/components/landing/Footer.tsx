import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Mail, ArrowUpRight, Heart } from 'lucide-react';

// 配置信息
const CONFIG = {
  brand: {
    name: 'ExamKiller',
    description: '让AI成为你的学习助手，智能分析考点、生成练习题、定制复习计划，助你轻松应对期末考试。',
    madein: 'China'
  },
  social: [
    { icon: Github, href: 'https://github.com', label: 'GitHub', username: '' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', username: '' },
    { icon: Mail, href: 'mailto:contact@examkiller.com', label: 'Email' }
  ],
  navigation: [
    {
      title: '产品',
      links: [
        { label: '功能特点', href: '#features' },
        { label: '使用场景', href: '#cases' },
        { label: '常见问题', href: '#faq' },
        { label: '价格方案', href: '/pricing' }
      ]
    },
    {
      title: '支持',
      links: [
        { label: '使用文档', href: '/docs' },
        { label: '学习博客', href: '/blog' },
        { label: '联系我们', href: '/contact' },
        { label: '反馈建议', href: '/feedback' }
      ]
    },
    {
      title: '合作',
      links: [
        { label: '成为合作伙伴', href: '/partners' },
        { label: '教育机构', href: '/education' },
        { label: '开发者', href: '/developers' },
        { label: '加入我们', href: '/careers' }
      ]
    }
  ],
  legal: [
    { label: '隐私政策', href: '/privacy' },
    { label: '使用条款', href: '/terms' },
    { label: '免责声明', href: '/disclaimer' }
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* 深色渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
      
      {/* 微妙的光效 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Link 
                href="/"
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                         bg-clip-text text-transparent inline-flex items-center gap-2 
                         hover:opacity-90 transition-opacity"
              >
                {CONFIG.brand.name}
              </Link>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                {CONFIG.brand.description}
              </p>
              <div className="flex items-center gap-1 text-gray-400">
                Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in {CONFIG.brand.madein}
              </div>
              <div className="flex gap-4">
                {CONFIG.social.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 
                             text-gray-400 hover:text-white transition-all
                             backdrop-blur-sm"
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation sections */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {CONFIG.navigation.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-semibold text-white/90">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group text-gray-400 hover:text-white inline-flex items-center gap-1
                                 transition-colors duration-300"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 
                                               group-hover:opacity-100 group-hover:translate-y-0 
                                               transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {CONFIG.brand.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {CONFIG.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}