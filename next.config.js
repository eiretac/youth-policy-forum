/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you're using
  },
  distDir: '.next',
  output: 'standalone',
}

module.exports = nextConfig 