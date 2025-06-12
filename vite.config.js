import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: '/',
  cacheDir: 'vite_cache',

  plugins: [
    // React with automatic JSX transform
    react({
      jsxRuntime: 'automatic'
    }),

    // Tailwind CSS support
    tailwindcss(),

    // Enable Brotli compression for smaller assets
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false
    }),
    // Bundle visualizer to analyze build size (optional for debugging)
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],

  server: {
    port: 5500,
    host: true,
    allowedHosts: ['b8f2-122-173-87-84.ngrok-free.app'],
    historyApiFallback: true
  },

  define: {
    global: 'globalThis'
  },

  build: {
    // Target modern browsers
    target: 'esnext',
    esbuildTarget: 'es2024',
    chunkSizeWarningLimit: 5000,
    // Directory settings
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,

    // Code splitting
    cssCodeSplit: true,

    // Minify with esbuild for speed
    minify: 'esbuild',

    // Separate vendor code
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }

  }
})
