import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    // Keep the initial payload small: vendor libraries are cached independently
    // of application code, and route bundles are split by React.lazy().
    //
    // The split is expressed as a function rather than a name->packages map so
    // deep entry points (`react-dom/client`, `react-icons/si`) land in the same
    // chunk as their package root instead of leaking into the app bundle.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(
              id
            )
          ) {
            return 'vendor-react'
          }
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'vendor-motion'
          }
          if (/[\\/]node_modules[\\/](lucide-react|react-icons)[\\/]/.test(id)) {
            return 'vendor-icons'
          }
          return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
})
