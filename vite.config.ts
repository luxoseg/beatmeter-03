import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          animations: ['framer-motion', 'canvas-confetti']
        }
      }
    }
  },
  publicDir: 'public',
  server: {
    historyApiFallback: true,
    port: 3000,
    strictPort: true,
    open: true
  },
  preview: {
    port: 5000,
    strictPort: true,
    open: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion', 
      '@headlessui/react', 
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid'
    ],
    exclude: []
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})