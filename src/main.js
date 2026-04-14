import { createApp } from 'vue'
//引入公共样式
import '@/global.css'
//引入文字图标库
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from './router'

let app = createApp(App)

//启用路由
app.use(router);

app.mount('#app')
