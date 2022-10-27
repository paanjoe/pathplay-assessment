/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'fakestoreapi.com']
  },
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
