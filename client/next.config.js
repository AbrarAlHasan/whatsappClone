/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false  ,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com','localhost'],
  }
};

module.exports = nextConfig;
