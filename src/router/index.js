import { createRouter,createWebHashHistory } from "vue-router";

//引入页面视图
//首页
import HomeView from "@/views/fronted/HomeView.vue";
//关于页面
import AboutView from "@/views/fronted/AboutView.vue";
//想法页面
import IdeaView from "@/views/fronted/IdeaView.vue";
//文章页面
import ArticleView from "@/views/fronted/ArticleView.vue";
import QueryArticlesView from "@/views/fronted/QueryArticlesView.vue";
//旅游
import TravelNoteView from "@/views/fronted/TravelNoteView.vue";
//路由表
let routes = [
    { path: "/", component: HomeView },
    { path: "/home", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/about", component: AboutView },
    { path: "/article", component: QueryArticlesView },
    // { path: "/article", component: ArticleView },
    { path: "/travelNote", component: TravelNoteView },
    { path: "/idea", component: IdeaView }

]

const router = createRouter({
    history : createWebHashHistory(),
    routes  : routes
})

export default router;