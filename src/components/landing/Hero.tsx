/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Target, Trophy, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  
  const images = [
    '/img/home.png',
    '/img/home2.png',
    '/img/home3.png'
  ];

  const nextImage = useCallback(() => {
    if (!isHovered) {
      setActiveImage((prev) => (prev + 1) % images.length);
    }
  }, [images.length, isHovered]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const features = [
    { icon: BookOpen, title: "智能分析系统", desc: "精准定位考试重点，智能规划学习路径" },
    { icon: Brain, title: "个性化复习计划", desc: "基于AI分析，为你量身定制专属计划" },
    { icon: Target, title: "实时学习反馈", desc: "及时跟踪学习进度，动态调整复习方向" },
    { icon: Trophy, title: "高效备考体系", desc: "科学规划时间，全方位提升学习效率" }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAFBFC] overflow-hidden">
      {/* Refined Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,_#f8fafc_0%,_transparent_60%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_left,_#f9fafb_0%,_transparent_50%)]" />
        <div className="absolute w-full h-full mesh-gradient opacity-40" />
      </div>

      <div className="relative container mx-auto px-6 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <motion.div 
            style={{ y: parallaxY }}
            className="flex-1 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium shadow-soft hover:shadow-md transition-all">
                <Sparkles className="w-4 h-4 text-blue-500" />
                AI智能学习助手
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900"
            >
              让AI为你的
              <br />
              <span className="gradient-text">
                期末考试保驾护航
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed mb-12"
            >
              运用先进的AI技术，为你提供智能化的学习解决方案。
              精准分析考点，定制专属复习计划，让备考更轻松、更高效。
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-white flex items-center justify-center shadow-soft group-hover:shadow-md transition-all">
                    <feature.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
            <Link href="/login" >
              <button className="group relative px-8 py-4 rounded-xl bg-gray-900 text-white font-medium overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <span className="relative z-10">开始体验</span>
                <div className="absolute inset-0 bg-blue-600 transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              </button>
            </Link>
              <button className="px-8 py-4 rounded-xl bg-white border border-gray-200 font-medium text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-colors shadow-soft hover:shadow-md">
                了解更多
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full pt-[75%]">
              <AnimatePresence mode="wait">
                {images.map((src, index) => (
                  index === activeImage && (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      onClick={() => setActiveImage((activeImage + 1) % images.length)}
                    >
                      <div className="relative w-full h-full p-4">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.12)] transition-all">
                          <Image
                            src={src}
                            alt={`产品展示 ${index + 1}`}
                            fill
                            className="object-contain"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Refined Light Effects */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-50" />
                        </div>
                        {/* Enhanced Ambient Light Effects */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-20" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-30" />
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              {/* Enhanced Image Navigation */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`h-1 rounded-full transition-all duration-300 hover:scale-110 ${
                      index === activeImage 
                        ? 'w-8 bg-blue-500 shadow-sm' 
                        : 'w-4 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;