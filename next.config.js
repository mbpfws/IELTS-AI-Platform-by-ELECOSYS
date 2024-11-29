/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'standalone',
  
  // Optimize images
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },

  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add fallback for url-loader and file-loader
    config.resolve.fallback = { 
      ...config.resolve.fallback, 
      fs: false,
      net: false,
      tls: false 
    };

    return config;
  },

  // API configuration
  async headers() {
    return [
      {
        // Allow CORS for API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },

  // Transpile specific packages if needed
  transpilePackages: [
    // Add any packages that need transpiling
  ],
}

module.exports = nextConfig
