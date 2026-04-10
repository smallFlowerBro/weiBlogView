import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
          resolvers: [ElementPlusResolver()],
          // 解决 TypeScript 报错 (可选，但推荐)
          dts: 'src/auto-imports.d.ts',
      }),
      Components({
        // 指定需要自动扫描的组件目录
        dirs: ['src/components/common'],
        resolvers:[ElementPlusResolver()]
      })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
