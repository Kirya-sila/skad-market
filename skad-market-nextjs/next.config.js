/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
      '@app': require('path').resolve(__dirname, './src/app'),
      '@assets': require('path').resolve(__dirname, './src/assets'),
      '@entities': require('path').resolve(__dirname, './src/entities'),
      '@layouts': require('path').resolve(__dirname, './src/layouts'),
      '@original-pages': require('path').resolve(__dirname, './src/original-pages'),
      '@shared': require('path').resolve(__dirname, './src/shared'),
      '@mixins': require('path').resolve(__dirname, './src/shared/ui/styles'),
    }
    return config
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig