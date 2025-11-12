/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_API: 'http://localhost:3000',
    PRODUCTION_API: ''
  },
  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api/health'
      },
      {
        source: '/ready',
        destination: '/api/ready'
      },
      {
        source: '/info',
        destination: '/api/info'
      }
    ];
  }
};

export default nextConfig; // Only ESM export
