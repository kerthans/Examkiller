/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础配置
  reactStrictMode: true,
  
  // API 配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://examkiller.top/api/:path*',
      },
    ];
  },
  // 添加这个配置
  webSocketTimeout: 300000,
  experimental: {
    forceSwcTransforms: true,
  },
  // 图像配置
  images: {
    domains: ['examkiller.top'],
  },
};

module.exports = nextConfig;