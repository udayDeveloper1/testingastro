// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import viteCompression from 'vite-plugin-compression'
// import { visualizer } from 'rollup-plugin-visualizer'

// export default defineConfig({
//   base: '/',
//   cacheDir: 'vite_cache',

//   plugins: [
//     react({
//       jsxRuntime: 'automatic',
//       babel: {
//         plugins: ['@babel/plugin-transform-runtime'],
//       },
//     }),

//     tailwindcss(),


//     viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 10240 }),
//     viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }),

//     visualizer({
//       filename: 'dist/stats.html',
//       open: false,
//       gzipSize: true,
//       brotliSize: true,
//     }),
//   ],

//   server: {
//     port: 5500,
//     host: true,
//     allowedHosts: ['b8f2-122-173-87-84.ngrok-free.app'],
//     historyApiFallback: true,
//   },

//   define: {
//     global: 'globalThis',
//   },

//   build: {
//     target: 'esnext',
//     chunkSizeWarningLimit: 1500, // lower this to catch bloats
//     outDir: 'dist',
//     emptyOutDir: true,
//     sourcemap: false,
//     cssCodeSplit: true,
//     reportCompressedSize: true,
//     minify: 'terser',

//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true,
//         passes: 3,
//         pure_funcs: ['console.info', 'console.debug', 'console.log', 'console.error'],
//       },
//       format: {
//         comments: false,
//       },
//     },

//     rollupOptions: {
//       output: {
//         // manualChunks(id) {
//         //   if (id.includes('node_modules')) {
//         //     return 'vendor'
//         //   }
//         // },
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
//             if (id.includes('react-router')) return 'vendor-react-router'
//             if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'vendor-redux'
//             if (id.includes('antd') || id.includes('@ant-design/icons')) return 'vendor-antd'
//             if (id.includes('dayjs') || id.includes('moment')) return 'vendor-date'
//             if (id.includes('lodash')) return 'vendor-lodash'
//             if (id.includes('axios')) return 'vendor-axios'
//             if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n'
//             if (id.includes('apexcharts') || id.includes('react-apexcharts')) return 'vendor-charts'
//             if (id.includes('sweetalert2')) return 'vendor-sweetalert2'
//             if (id.includes('socket.io-client')) return 'vendor-socket'
//             if (id.includes('@fortawesome')) return 'vendor-fontawesome'
//             if (id.includes('lucide-react')) return 'vendor-lucide'
//             return 'vendor-other'
//           }
//         }
//       },
//     },
//   },
// })



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
        plugins: ['@babel/plugin-transform-runtime'],
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

            if (id.includes('firebase')) return 'firebase';
            if (id.includes('axios')) return 'axios';
            if (id.includes('@headlessui')) return 'headlessui';
            if (id.includes('lodash')) return 'lodash';

            return 'vendor';
          }
        }
      },
    },
  },
})
