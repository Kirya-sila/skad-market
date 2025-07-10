/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
      '@app': require('path').resolve(__dirname, './src/app'),
      '@assets': require('path').resolve(__dirname, './src/assets'),
      '@entities': require('path').resolve(__dirname, './src/entities'),
      '@layouts': require('path').resolve(__dirname, './src/layouts'),
      '@pages': require('path').resolve(__dirname, './src/pages'),
      '@shared': require('path').resolve(__dirname, './src/shared'),
      '@mixins': require('path').resolve(__dirname, './src/shared/ui/styles'),
    }
    return config
  },
}

module.exports = nextConfig