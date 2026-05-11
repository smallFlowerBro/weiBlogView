import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {getToken} from "@/lib/auth/index.js";
import {useRouter} from "vue-router";

//路由表
let routes = [


    { path: "/",
      component: ()=>import("@/views/fronted/IndexView.vue"),
      children:[
          {
              //首页
              path:"",
              component:()=>import("@/views/fronted/HomeView.vue")
          },
          {
              //首页
              path:"/home",
              component:()=>import("@/views/fronted/HomeView.vue")
          },
          {
              //关于
              path: "/about",
              component: ()=>import("@/views/fronted/AboutView.vue")
          },
          {
              //全部文章
              path: "/articles",
              component: ()=>import("@/views/fronted/QueryArticlesView.vue")
          },
          {
              //文章
              path: "/article/:id/:key",
              name: "Article",
              component:()=>import("@/views/fronted/ArticleView.vue")

          },
          {
              //旅游历程
              path: "/travelNote",
              component: ()=>import("@/views/fronted/TravelNoteView.vue")
          },
          {
              //
              path: "/idea",
              component: ()=>import("@/views/fronted/IdeaView.vue")
          },
          {
              //
              path: "/404",
              component:()=>import("@/views/fronted/NotFundView.vue")
          }
      ]

    },
    {
        path: "/test",
        component: ()=>import("@/views/fronted/TestVue.vue")
    },
    {
        path: "/login",
        component:()=>import("@/views/admin/LoginView.vue")
    },
    {
      path: "/admin",
      component:()=>import("@/views/admin/AdminIndexView.vue"),
      children: [
          {
              //首页
              path:"",
              component:()=>import("@/components/Dashboard.vue")
          },
          {
              //默认大屏页面
              path: "/admin/dashboard",
              component:()=>import("@/components/Dashboard.vue")
          },
          {
              //默认大屏页面
              path: "/admin/posts",
              component:()=>import("@/components/PostsManager.vue")
          },
          {
              //默认大屏页面
              path: "/admin/comments",
              component:()=>import("@/components/CommentsManager.vue")
          },
          {
              //默认大屏页面
              path: "/admin/logs",
              component:()=>import("@/components/LogsPanel.vue")
          },{
              //默认大屏页面
              path: "/admin/theme",
              component:()=>import("@/components/ThemePanel.vue")
          },
      ]
    },

    //没有匹配的问题
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }

]

const router = createRouter({
    history : createWebHashHistory(),
    routes  : routes
})

router.beforeEach((to, from, next) => {
    let isAdmin = to.matched.some(record=>record.path.startsWith("/admin"))
    if(isAdmin){
        let token =getToken();
        if (token){
            next()
        }else{
            router.push("/login")
        }

    }else{
        next();
    }

});


export default router;