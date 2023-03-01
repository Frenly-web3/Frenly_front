/* eslint-disable import/no-extraneous-dependencies */
const runtimeCaching = require( 'next-pwa/cache.js');
// const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
   skipWaiting: true,
  register: true,
})
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     })

//     return config
//   },
// })

module.exports = withPWA({
  eslint: {
    dirs: ['.'],
  },
  images: {
    domains: ['flatspacenfts.unistory.app', 'gm.frenly.cc'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },  
  // disable: !prod,
  // skipWaiting: true,
  // register: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_API_URL,
    
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.js', 'page.jsx'],
})
