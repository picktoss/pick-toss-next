import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizeCss: true,
  },
}

export default withPWA({
  dest: 'public', // destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
  dynamicStartUrl: true,
  // 서비스 워커 범위 제한
  scope: '/',
  // iPad에서의 안정성을 위한 추가 설정
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.mode === 'navigate', // 모든 페이지 요청에 적용
      handler: 'CacheFirst', // ✅ 오프라인에서도 실행 가능하도록 설정
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7일간 유지
        },
      },
    },
    // {
    //   urlPattern: /^https?.*/,
    //   handler: 'StaleWhileRevalidate', // 최신 데이터 로드하면서 빠르게 표시
    //   options: {
    //     cacheName: 'api-cache',
    //     expiration: {
    //       maxEntries: 200,
    //       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //     },
    //   },
    // },
  ],
})(nextConfig)
