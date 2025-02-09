/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Calculator, FlaskConical, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CaseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  primaryColor: string;
  secondaryColor: string;
}

const cases: CaseItem[] = [
  {
    icon: BookOpen,
    title: '文科考试',
    description: '智能总结重点，生成记忆卡片',
    features: ['知识点智能关联', '历年真题解析', '作文批改指导'],
    primaryColor: 'from-blue-600',
    secondaryColor: 'to-indigo-500'
  },
  {
    icon: Calculator,
    title: '理科考试',
    description: '解析习题步骤，精准定位错误，针对性练习',
    features: ['公式推导过程', '错题智能分析', '重难点突破'],
    primaryColor: 'from-emerald-600',
    secondaryColor: 'to-teal-500'
  },
  {
    icon: FlaskConical,
    title: '实验考试',
    description: '实验流程复习，要点提示，常见问题解析',
    features: ['实验步骤演示', '安全事项提醒', '数据分析指导'],
    primaryColor: 'from-orange-600',
    secondaryColor: 'to-amber-500'
  },
  {
    icon: Globe,
    title: '语言考试',
    description: '场景对话练习，写作批改，口语评测',
    features: ['口语发音评测', '写作范文推荐', '听力训练'],
    primaryColor: 'from-violet-600',
    secondaryColor: 'to-purple-500'
  }
];

const UseCases: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleSelection = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <section className="py-32 bg-gray-950 relative overflow-hidden min-h-[800px]" id="cases">
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,41,59,0.5),rgba(15,23,42,1)_100%)]" />
      
      <div className="max-w-8xl mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          {/* 左侧圆形交互区域 */}
          <div className="relative w-full lg:w-2/3 h-[700px] flex items-center justify-center">
            {/* 中心发光圆环 */}
            <div className="absolute w-80 h-80 rounded-full bg-gray-900 
                           flex items-center justify-center overflow-hidden">
              <div className={`
                absolute inset-0 bg-gradient-to-r 
                ${cases[activeIndex].primaryColor} ${cases[activeIndex].secondaryColor}
                opacity-20 blur-xl transition-all duration-700
              `} />
              
              {/* 动态光环 */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                              animate-pulse blur-xl" />
              </div>
              
              {/* 中心内容 */}
              <div className="relative text-center z-10 p-12">
                <div className="transition-all duration-500 transform scale-110">
                  <div className="text-3xl font-medium text-white mb-4">
                    {cases[activeIndex].title}
                  </div>
                  <div className="text-gray-400 text-lg">
                    选择您的考试类型
                  </div>
                </div>
              </div>
            </div>

            {/* 旋转的选项 */}
            <div className="absolute inset-0">
              {cases.map((item, index) => {
                const isActive = activeIndex === index;
                const angle = ((360 / cases.length) * index - 90) * (Math.PI / 180);
                const radius = 310;  // 增加半径
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className={`
                      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      transition-all duration-700 ease-out cursor-pointer
                      ${isActive ? 'z-20' : 'z-10'}
                    `}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    onClick={() => handleSelection(index)}
                  >
                    <div className={`
                      relative group transition-all duration-500
                      ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}
                    `}>
                      {/* 发光背景 */}
                      <div className={`
                        absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100
                        bg-gradient-to-r ${item.primaryColor} ${item.secondaryColor}
                        blur transition-all duration-500
                        ${isActive ? 'opacity-100' : ''}
                      `} />

                      {/* 图标容器 */}
                      <div className={`
                        relative w-20 h-20 rounded-full
                        bg-gray-900 border border-gray-800
                        flex items-center justify-center
                        transition-all duration-500
                        group-hover:border-gray-700
                        ${isActive ? 'border-gray-600' : ''}
                      `}>
                        <item.icon className={`
                          w-10 h-10 transition-all duration-500
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                        `} />
                        
                        {/* 动态光晕 */}
                        <div className={`
                          absolute inset-0 rounded-full
                          bg-gradient-to-r ${item.primaryColor} ${item.secondaryColor}
                          opacity-0 group-hover:opacity-20 transition-all duration-500
                          ${isActive ? 'opacity-30' : ''}
                        `} />
                      </div>

                      {/* 标题和描述 - 向外扩展 */}
                      <div className={`
                        absolute top-full left-1/2 -translate-x-1/2 mt-6
                        text-center w-64 transition-all duration-500
                        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                      `}>
                        <h3 className="text-white text-xl font-medium mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 装饰性光环 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                            rounded-full animate-pulse blur-3xl" />
            </div>
          </div>

          {/* 右侧标题和说明文本 */}
          <div className="lg:w-1/3 text-left lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              适用所有<br />考试场景
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              为不同学科特点定制的解决方案，助力考试全方位提升。智能化的学习辅导系统，让备考更高效，成绩更优异。
            </p>
            <div className="space-y-4">
              <p className="text-gray-400">
                当前选择：
                <span className={`
                  text-lg font-medium ml-2 bg-gradient-to-r 
                  ${cases[activeIndex].primaryColor} ${cases[activeIndex].secondaryColor}
                  bg-clip-text text-transparent
                `}>
                  {cases[activeIndex].title}
                </span>
              </p>
              <div className="space-y-2">
                {cases[activeIndex].features.map((feature, idx) => (
                  <div key={idx} className="text-gray-400 flex items-center gap-2">
                    <div className={`
                      w-1.5 h-1.5 rounded-full bg-gradient-to-r 
                      ${cases[activeIndex].primaryColor} ${cases[activeIndex].secondaryColor}
                    `} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;