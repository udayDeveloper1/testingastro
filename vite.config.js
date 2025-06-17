import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: '/',
  cacheDir: 'vite_cache',

  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@babel/plugin-transform-runtime',],
      },
    }),
    tailwindcss(),
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 10240 }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    port: 5500,
    host: true,
    allowedHosts: ['b8f2-122-173-87-84.ngrok-free.app'],
    historyApiFallback: true,
  },

  define: {
    global: 'globalThis',
  },

  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: true,
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.info', 'console.debug', 'console.log', 'console.error'],
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        // },

        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')
            ) {
              return 'react-vendors';
            }
            if (id.includes('node_modules/axios')) return 'axios';
            if (id.includes('node_modules/lodash')) return 'lodash';
            if (id.includes('node_modules/antd')) return 'antd';
            if (id.includes('node_modules/moment')) return 'moment';
            if (id.includes('node_modules/apexcharts')) return 'apexcharts';
            if (id.includes('node_modules/browser-image-compression')) return 'browser-image-compression';
            if (id.includes('node_modules/dayjs')) return 'dayjs';
            if (id.includes('node_modules/i18next')) return 'i18next';
            if (id.includes('node_modules/razorpay')) return 'razorpay';
            if (id.includes('node_modules/sweetalert2')) return 'sweetalert2';
            return 'vendor';
          }
        }
      },
    },
  },
})
