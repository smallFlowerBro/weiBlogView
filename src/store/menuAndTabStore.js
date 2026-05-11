import {defineStore} from "pinia";
import {ref} from "vue";
import {useRouter} from "vue-router";


// // 页面配置
const pageConfig = {
    dashboard: { name: '仪表盘', icon: 'fas fa-tachometer-alt', label: '仪表盘' },
    posts: { name: '文章管理', icon: 'fas fa-file-alt', label: '文章管理' },
    comments: { name: '评论审核', icon: 'fas fa-comment-dots', label: '评论审核' },
    logs: { name: '操作日志', icon: 'fas fa-history', label: '操作日志' },
    theme: { name: '外观主题', icon: 'fas fa-palette', label: '外观主题' }
}
export const menuAndTabStore = defineStore("menuAndTab",()=>{

    let router = useRouter();
    //活跃的菜单
    let activeMenu=  ref("dashboard");
    //活跃的菜单名字
    let activeTabName =  ref("");
    //打开的tab页
    let openedTabs = ref([]);

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
        openPage
    }


})