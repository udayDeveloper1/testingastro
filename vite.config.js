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
            if (id.includes('node_modules/react-i18next')) return 'i18next';
            if (id.includes('node_modules/@ant-design/icons')) return 'ant-icons';
            // if (id.includes('node_modules/@fortawesome/')) return 'fontawesome';
            // if (id.includes('node_modules/@fortawesome/')) return 'fontawesome';
            // if (id.includes('node_modules/react-toastify')) return 'toastify';
            // if (id.includes('node_modules/socket.io-client')) return 'socket';
            // if (id.includes('node_modules/sweetalert2')) return 'sweetalert';
            // if (id.includes('node_modules/react-hook-form')) return 'hook-form';
            // if (id.includes('node_modules/react-router')) return 'router';
            // if (id.includes('node_modules/react-router-dom')) return 'router';
            // if (id.includes('node_modules/react-redux') || id.includes('node_modules/@reduxjs/toolkit')) return 'redux';
            // if (id.includes('node_modules/crypto-js')) return 'crypto';
            // if (id.includes('node_modules/dompurify')) return 'dompurify';
            // if (id.includes('node_modules/apexcharts') || id.includes('node_modules/react-apexcharts')) return 'apexcharts';
            // if (id.includes('node_modules/browser-image-compression')) return 'image-compression';
            // if (id.includes('node_modules/react-phone-input-2')) return 'phone-input';
            // if (id.includes('node_modules/react-helmet') || id.includes('node_modules/react-helmet-async')) return 'helmet';
            // if (id.includes('node_modules/react-icons')) return 'react-icons';
            // if (id.includes('node_modules/keen-slider')) return 'keen-slider';
            // if (id.includes('node_modules/lucide-react')) return 'lucide';
            // if (id.includes('node_modules/react-player')) return 'react-player';
            return 'vendor';
          }
        }
      },
    },
  },
})
