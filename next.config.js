/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_SERVER: process.env.NEXT_APP_SERVER
  },
  reactStrictMode: false,
  images: {
    domains: ['cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
