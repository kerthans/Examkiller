/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const wasPlaying = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      setError(videoElement.error?.message || "视频加载失败，请稍后重试");
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
      }
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle video playback based on viewport visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      if (wasPlaying.current && !error) {
        videoRef.current.play().catch(err => {
          console.log("Auto-play failed:", err);
          setError("自动播放失败，请手动点击播放按钮");
        });
        setIsPlaying(true);
      }
    } else {
      wasPlaying.current = isPlaying;
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, error, isPlaying]);

  // Initial autoplay
  useEffect(() => {
    if (isInView && !error && isLoading) {
      const video = videoRef.current;
      if (!video) return;

      video.play().catch(err => {
        console.log("Initial auto-play failed:", err);
        setError("自动播放失败，请手动点击播放按钮");
      });
      setIsPlaying(true);
      wasPlaying.current = true;
    }
  }, [isInView, error, isLoading]);

  const handlePlayPause = () => {
    if (error) {
      setError(null);
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.load();
      }
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => {
          console.log("Play failed:", err);
          setError("播放失败，请检查网络连接后重试");
        });
        setIsPlaying(true);
      }
      wasPlaying.current = !isPlaying;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const time = (percentage / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  const handleProgressDragStart = () => {
    setIsDragging(true);
  };

  const handleProgressDragEnd = () => {
    setIsDragging(false);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      const time = (percentage / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
    setShowControls(true);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current !== null) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!isFullscreen) {
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <section className="py-24 bg-white" id="demo">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            观看
            <span className="text-blue-600 px-3">
              演示视频
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            一分钟了解AI如何助你备战期末考试
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[1200px] mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Main video container with shadow */}
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onClick={handleVideoClick}
                muted={isMuted}
                playsInline
                preload="auto"
              >
                <source src="/video/demo.mp4" type="video/mp4" />
              </video>

              {/* Loading indicator - Only show when initially loading */}
              {isLoading && !isPlaying && !error && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-white text-center mb-4">{error}</p>
                  <button
                    onClick={handlePlayPause}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    重试
                  </button>
                </div>
              )}

              {/* Controls overlay */}
              <AnimatePresence>
                {(showControls || !isPlaying) && !error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                  >
                    {/* Center play button */}
                    {!isPlaying && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-200 hover:bg-white transition-all duration-300 shadow-xl"
                        onClick={handlePlayPause}
                      >
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </motion.button>
                    )}

                    {/* Bottom controls bar */}
                    <div className="p-4 space-y-3">
                      {/* Progress bar */}
                      <div
                        ref={progressRef}
                        className="relative h-1.5 bg-white/40 rounded-full overflow-hidden cursor-pointer group"
                        onClick={handleProgressClick}
                        onMouseDown={handleProgressDragStart}
                        onMouseUp={handleProgressDragEnd}
                        onMouseLeave={handleProgressDragEnd}
                        onMouseMove={handleProgressDrag}
                      >
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-blue-500"
                          style={{ width: `${progress}%` }}
                        />
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ left: `${progress}%` }}
                        >
                          <div className="absolute inset-0.5 bg-white rounded-full" />
                        </motion.div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={handlePlayPause}
                            className="text-white hover:text-blue-400 transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6" />
                            ) : (
                              <Play className="w-6 h-6" />
                            )}
                          </button>
                          <button
                            onClick={handleMuteToggle}
                            className="text-white hover:text-blue-400 transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX className="w-6 h-6" />
                            ) : (
                              <Volume2 className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={toggleFullscreen}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isFullscreen ? (
                            <Minimize className="w-6 h-6" />
                          ) : (
                            <Maximize className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Video info section */}
          <div className="relative mt-6 p-6 bg-white rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                通过AI助手，轻松应对期末考试
              </p>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
              >
                了解更多 <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}