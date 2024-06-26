/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
  // ,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sorolan-bridge-dgsjt552o-ssinghbb.vercel.app/:path*',
      },
    ]
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  }
}

module.exports = {
  nextConfig
};
