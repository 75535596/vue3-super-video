import { fileURLToPath, URL } from 'node:url'
import copy from 'rollup-plugin-copy'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/vue3-super-video/',
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: 'src/views/*',
          dest: 'public/ComponentDemo',
        },
        {
          src: 'vue3-super-video.d.ts',
          dest: 'dist/',
        },
        {
          src: 'packages/api/types.d.ts',
          dest: 'dist/api/',
        },
      ],
      hook: 'writeBundle', // 在构建完成后执行复制
      verbose: true, // 显示复制信息
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      packages: fileURLToPath(new URL('./packages', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: fileURLToPath(new URL('./packages/index.ts', import.meta.url)),
      name: 'vue3-super-video',
      fileName: 'vue3-super-video',
    },
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'axios',
        'element-plus',
        /^element-plus\/.*/,
        'vue-router',
        'vue3-pdf-app',
        '@vue-office/docx',
        'vitest',
        'jsdom',
        '@vue/test-utils',
      ],
      output: {
        assetFileNames: 'vue3-super-video.[ext]',
        exports: 'named',
        globals: {
          vue: 'Vue',
          echarts: 'echarts',
          'element-plus': 'ElementPlus',
          axios: 'axios',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          'vue3-pdf-app': 'VuePdfApp',
          '@vue-office/docx': 'VueOfficeDocx',
          vitest: 'vitest',
          jsdom: 'jsdom',
          '@vue/test-utils': 'VueTestUtils',
        },
      },
    },

    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
})
