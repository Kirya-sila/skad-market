import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { fileURLToPath } from 'node:url'

const filesNeedToExclude = ['src/pages/uikit-page']

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url))
})

export default defineConfig({
  css: { modules: { localsConvention: 'camelCase' } },
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: './build',
    rollupOptions: {
      external: [...filesPathToExclude],
    },
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': normalizePath(path.resolve(__dirname, './src')),
      '@app': normalizePath(path.resolve(__dirname, './src/app')),
      '@assets': normalizePath(path.resolve(__dirname, './src/assets')),
      '@entities': normalizePath(path.resolve(__dirname, './src/entities')),
      '@layouts': normalizePath(path.resolve(__dirname, './src/layouts')),
      '@pages': normalizePath(path.resolve(__dirname, './src/pages')),
      '@shared': normalizePath(path.resolve(__dirname, './src/shared')),
      '@mixins': normalizePath(path.resolve(__dirname, './src/shared/ui/styles')),
    },
  },
})
