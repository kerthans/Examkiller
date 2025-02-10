/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础配置
  reactStrictMode: true,
  
  // API 配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://101.201.246.5:8000/api/:path*',
      },
    ];
  },
  // 添加这个配置
  // 图像配置
  images: {
    domains: ['examkiller.top'],
  },
};

module.exports = nextConfig;