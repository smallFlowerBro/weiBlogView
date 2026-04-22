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
  //打包配置 切分太细
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
    // build: {
    //     // ⚠️ 关键：关闭 CSS 代码分割
    //     // 这会把所有 CSS 合并成一个 style.css，而不是每个页面一个 css
    //     cssCodeSplit: false,
    //
    //     rollupOptions: {
    //         output: {
    //             // 🚀 核心：极简分包策略
    //             manualChunks: (id) => {
    //                 // 1. 只要是 node_modules 里的，全部打包进 vendor.js
    //                 if (id.includes('node_modules')) {
    //                     return 'vendor';
    //                 }
    //
    //                 // 2. 剩下的所有业务代码（views, components, utils），全部打包进 index.js
    //                 // 不写 return 或者 return undefined，就会落入默认包
    //                 return 'index';
    //             },
    //
    //             // 📝 文件名配置
    //             entryFileNames: 'js/[name]-[hash:8].js',
    //             chunkFileNames: 'js/[name]-[hash:8].js',
    //
    //             // 🎨 资源文件归类 (保持整洁)
    //             assetFileNames: (assetInfo) => {
    //                 const name = assetInfo.name || '';
    //                 let type = 'other';
    //                 if (/\.css$/i.test(name)) type = 'css';
    //                 else if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) type = 'img';
    //                 else if (/\.woff2?$|\.ttf|\.eot$/i.test(name)) type = 'font';
    //                 return `assets/${type}/[name]-[hash:8].[ext]`;
    //             }
    //         }
    //     }
    // }
})
