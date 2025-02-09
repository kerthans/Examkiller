// app/page.tsx
"use client";

import { useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import DemoVideo from '@/components/landing/DemoVideo';
import UseCases from '@/components/landing/UseCases';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  useEffect(() => {
    // 页面加载优化
    const prefetchImages = () => {
      const images = [
        '/img/home.png',
        '/img/home2.png',
        '/img/home3.png',
        '/video-poster.jpg'
      ];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // 延迟加载非关键资源
    window.addEventListener('load', () => {
      setTimeout(prefetchImages, 1000);
    });

    // 平滑滚动处理
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 清理函数
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <DemoVideo />
      <UseCases />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}