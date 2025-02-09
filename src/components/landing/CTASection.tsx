import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Shield, Zap, Clock } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-8 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
      {/* Enhanced mesh gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                     bg-[radial-gradient(circle_at_center,#3B82F6_0%,rgba(59,130,246,0)_70%)]
                     blur-3xl opacity-40 mix-blend-overlay"
          style={{
            transform: 'translate(25%, -25%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full
                     bg-[radial-gradient(circle_at_center,#60A5FA_0%,rgba(96,165,250,0)_70%)]
                     blur-3xl opacity-40 mix-blend-overlay"
          style={{
            transform: 'translate(-25%, 25%)',
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200 rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-200 rounded-full animate-ping animation-delay-1000" />
        <Star className="absolute top-1/3 right-1/3 w-4 h-4 text-blue-200 animate-pulse" />
        <Star className="absolute bottom-1/3 left-1/3 w-4 h-4 text-blue-200 animate-pulse animation-delay-700" />
      </div>

      {/* Content container */}
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-1.5xl mx-auto" // 调整为更窄的宽度
        >
          <div className="text-center space-y-3"> {/* 减小间距 */}
            {/* Main heading with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-1.5" // 减小间距
            >
              <h2 className="text-4xl font-bold tracking-tight text-white"> {/* 略微减小字号 */}
                <span className="inline-block mb-2">
                  准备好提升你的
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent pb-2">
                  期末考试成绩了吗？
                </span>
              </h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed"> {/* 减小字号和最大宽度 */}
                立即开始使用AI助手，让复习更高效，考试更轻松
              </p>
            </motion.div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> {/* 减小间距 */}
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-white text-blue-600
                         rounded-xl font-medium shadow-xl shadow-black/10
                         overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white
                              translate-x-[-100%] group-hover:translate-x-[100%] 
                              transition-transform duration-700" />
                
                <span className="relative z-10 flex items-center gap-3 text-base">
                  <Sparkles className="w-5 h-5" />
                  <span>免费开始体验</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>

              <motion.a
                href="#learn-more"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-blue-100 hover:text-white font-medium 
                         flex items-center gap-2 transition-colors duration-300"
              >
                了解更多
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>

            {/* Updated feature highlights */}
            <div className="pt-2"> {/* 减小上边距 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-x-10 gap-y-3" // 减小间距
              >
                {[
                  { icon: Shield, text: '安全可靠', color: 'text-blue-200' },
                  { icon: Zap, text: '实时反馈', color: 'text-blue-100' },
                  { icon: Clock, text: '快速上手', color: 'text-white' }
                ].map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-2 text-blue-100"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    {item.text}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}