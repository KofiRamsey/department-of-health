/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me"],
  },
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig; 