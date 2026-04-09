import { createApp } from 'vue'
//引入公共样式
import '@/global.css'
//引入文字图标库
import '@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.vue'
import router from './router'


let app = createApp(App)


// --- 自动注册全局组件开始 ---
const components = import.meta.glob('./components/common/*.vue', { eager: true })

Object.entries(components).forEach(([path, component]) => {
  // 从路径中提取文件名作为组件名
  // 例如：./components/MyButton.vue -> MyButton
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  
  // 注册组件
  app.component(componentName, component.default || component)
})


//启用路由
app.use(router);

app.mount('#app')
