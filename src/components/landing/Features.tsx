"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Target, Clock, ChartBar, Shield, Zap, Bot, Gift, LucideIcon } from 'lucide-react';

type ColorVariant = 'slate' | 'blue' | 'gray' | 'cool' | 'warm' | 'neutral';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorVariant;
  detail: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: '智能解析考点',
    description: '运用NLP技术分析课程资料，自动提取和整理重要考点',
    color: 'slate',
    detail: '基于深度学习的智能分析系统，准确率达95%以上'
  },
  {
    icon: Target,
    title: '个性化练习',
    description: '基于你的薄弱环节，智能生成针对性的练习题',
    color: 'blue',
    detail: '算法根据错题分布持续优化推荐难度'
  },
  {
    icon: Clock,
    title: '科学复习计划',
    description: '结合艾宾浩斯遗忘曲线，制定最优复习时间表',
    color: 'gray',
    detail: '智能调整复习间隔，提高记忆效果'
  },
  {
    icon: ChartBar,
    title: '学习分析',
    description: '可视化展示你的学习进度和知识掌握程度',
    color: 'cool',
    detail: '多维度数据分析，直观展示学习效果'  
  },
  {
    icon: Shield,
    title: '错题记录',
    description: '自动保存错题并生成专属题库，及时查漏补缺',
    color: 'warm',
    detail: '智能分类错题，针对性强化训练'
  },
  {
    icon: Zap,
    title: '快速回顾',
    description: '考前快速复习模式，抓住重点、提升效率',
    color: 'neutral',
    detail: '自动生成知识点速览，把握考试重点'
  },
  {
    icon: Bot,
    title: 'AI答疑',
    description: '24小时在线解答学习疑问，像真人老师一样',
    color: 'slate',
    detail: '支持多轮对话，准确理解学习难点'
  },
  {
    icon: Gift,
    title: '学习奖励',
    description: '完成学习目标获得积分，兑换学习资源',
    color: 'blue',
    detail: '丰富的奖励机制，让学习更有动力'
  }
];

const colorVariants: Record<ColorVariant, string> = {
  slate: 'bg-slate-50 text-slate-600 dark:bg-slate-900/40 dark:text-slate-300',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  gray: 'bg-gray-50 text-gray-600 dark:bg-gray-900/40 dark:text-gray-300',
  cool: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300',
  warm: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  neutral: 'bg-neutral-50 text-neutral-600 dark:bg-neutral-900/40 dark:text-neutral-300'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden" id = "features">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-50/20 via-transparent to-transparent dark:from-blue-900/10" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-tl from-slate-50/20 via-transparent to-transparent dark:from-slate-900/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            为什么选择 
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {" "}ExamKiller
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            融合最新AI技术，打造个性化学习体验，让复习更高效、更轻松
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
            >
              <div className="relative">
                <div className={`w-14 h-14 ${colorVariants[feature.color]} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>

                <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 ${hoveredIndex === index ? 'border-blue-500/20' : ''}`} />
                
                {/* Additional detail that appears on hover */}
                <div className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  {feature.detail}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-gray-100 dark:border-gray-700 rounded-2xl group-hover:border-blue-500/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}