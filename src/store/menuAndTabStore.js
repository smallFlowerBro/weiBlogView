import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";




// // 页面配置
const pageConfig = {}


export const menuAndTabStore = defineStore("menuAndTab",()=>{

    let router = useRouter();
    //活跃的菜单
    let activeMenu=  ref("dashboard");
    //活跃的菜单名字
    let activeTabName =  ref("");
    //打开的tab页
    let openedTabs = ref([]);

    let menu_info = reactive({
        is_loading:true,
        menus:[]
    })


    const init = function (){
        menu_info.is_loading=false;
        menu_info.menus = [
            {
                name : "仪表盘",
                label : "仪表盘",
                icon : "fas fa-tachometer-alt",
                index: "dashboard",
                children : []
            },
            {
                name : "内容管理",
                icon : "fas fa-folder-open",
                index: "content",
                children : [
                    {
                        name : "分类管理",
                        label : "分类管理",
                        icon : "fas fa-layer-group",
                        index: "categories",
                    },{
                        name : "标签管理",
                        label : "标签管理",
                        icon : "fas fa-tags",
                        index: "tags",
                    },
                    {
                        name : "文章管理",
                        label : "文章管理",
                        icon : "fas fa-file-alt",
                        index: "posts",
                    },
                    {
                        name : "文章编辑",
                        label : "文章编辑",
                        icon : "fas fa-pencil-alt",
                        index: "articleEdit",
                    },
                    {
                        name : "评论审核",
                        label : "评论审核",
                        icon : "fas fa-comment-dots",
                        index: "comments",
                    },

                ]
            },
            {
                name : "运行维护",
                icon : "fas fa-tools",
                index: "maintain",
                children : [
                    {
                        name : "操作日志",
                        label : "操作日志",
                        icon : "fas fa-file-alt",
                        index: "logs",
                    }
                ]
            },
            {
                name : "系统设置",
                icon : "fas fa-sliders-h",
                index: "settings",
                children : [
                    {
                        name : "用户中心",
                        label : "用户中心",
                        icon : "fas fa-user",
                        index: "userCenter",
                    },{
                        name : "偏好设置",
                        label : "偏好设置",
                        icon : "fas fa-cogs",
                        index: "preference",
                    }
                ]
            },
        ]

        menu_info.menus.forEach((menu)=>{
            if(menu.children.length===0){
                pageConfig[menu.index] = menu;
            }else{
                menu.children.forEach((sub_menu)=>{
                    pageConfig[sub_menu.index] = sub_menu;
                })
            }
        })

        console.log(pageConfig)

    }

    init();


    const openPage = (pageId)=>{

        const config = pageConfig[pageId]
        if (!config) return

        // 检查是否已打开
        const existingTab = openedTabs.value.find(tab => tab.pageId === pageId)
        if (existingTab) {
            activeTabName.value = existingTab.name
        } else {
            const newTabName = `${pageId}-${Date.now()}`
            const newTab = {
                name: newTabName,
                pageId: pageId,
                label: config.label,
                icon: config.icon
            }
            openedTabs.value.push(newTab)
            activeTabName.value = newTabName
        }
        activeMenu.value = pageId
        router.push("/admin/"+pageId)
    }



    return{
        activeMenu,
        activeTabName,
        openedTabs,
        menu_info,
        openPage
    }


})