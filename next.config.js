/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'], // Add any image domains you're using
  },
  distDir: '.next',
  output: 'standalone',
  rewrites: async () => {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },
}

module.exports = nextConfig 