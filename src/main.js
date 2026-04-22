import { createApp } from 'vue'
//引入公共样式
import '@/global.css'
//引入文字图标库
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

let pinia = createPinia();
let app = createApp(App)

//启用路由
app.use(router);
//启用pinia状态管理
app.use(pinia)
app.mount('#app')
