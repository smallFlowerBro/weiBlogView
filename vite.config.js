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
  //打包配置
  build:{
    outDir   : "dist",   // 打包输出目录
    assetsDir: "assets", // 指定静态文件的存放路径
    sourcemap: false,    // 生产环境关闭sourcemap
    target   : "esnext", // 构建目标利用现代浏览器特性
    minify   : "terser", // 使用terser进行代码压缩
    terserOptions:{
        compress:{
            drop_console : true, //生产环境移除console.log 输出
            drop_debugger: true  //生产环境移除debugger
        }
    },
    rollupOptions:{
        output:{
            //分包策略 将第三方依赖单独打包 利于浏览器缓存
            "vendor-vue":["vue","vue-router","pinia"],
            "vendor-ui" :["element-plus"]
        },
        entryFileNames : 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetsFileNames: 'assets/[ext]/[name]-[hash].[ext]'
    }
  }

})
