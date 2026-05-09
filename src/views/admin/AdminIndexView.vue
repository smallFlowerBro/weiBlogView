<template>
  <div class="app-wrapper">
    <!-- 左侧导航区 -->
    <nav-sidebar></nav-sidebar>

    <!-- 右侧工作区 -->
    <div class="right-workspace">
      <!-- 顶部栏 -->
      <div class="top-action-bar">
        <div class="btn-icon-group">
          <el-button text @click="toggleTheme" :title="isDarkTheme ? '切换至日光模式' : '切换至暗夜模式'">
            <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </el-button>
          <el-button text @click="toggleFullscreen" title="全屏">
            <i class="fas fa-expand"></i>
          </el-button>
          <el-button text @click="handleLogout" title="退出登录">
            <i class="fas fa-sign-out-alt"></i>
          </el-button>
        </div>
      </div>

      <!-- Element Plus Tabs 多标签页 -->
      <el-tabs
          v-model="activeTabName"
          type="card"
          class="custom-tabs"
          @tab-click="handleTabClick"
          @tab-remove="handleTabRemove"
          closable
      >
        <el-tab-pane
            v-for="tab in openedTabs"
            :key="tab.name"
            :name="tab.name"
            :label="tab.label"
        >
          <template #label>
            <span><i :class="tab.icon"></i> {{ tab.label }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 动态内容区域 -->
      <div class="content-pane">
        <component :is="currentComponent" :key="activeTabName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Dashboard from '@/components/Dashboard.vue'
import PostsManager from '@/components/PostsManager.vue'
import CommentsManager from '@/components/CommentsManager.vue'
import LogsPanel from '@/components/LogsPanel.vue'
import ThemePanel from '@/components/ThemePanel.vue'
import NavSidebar from "@/components/admin/NavSidebar.vue";

// 页面组件映射
const pageComponentMap = {
  dashboard: Dashboard,
  posts: PostsManager,
  comments: CommentsManager,
  logs: LogsPanel,
  theme: ThemePanel
}

// 页面配置
const pageConfig = {
  dashboard: { name: '仪表盘', icon: 'fas fa-tachometer-alt', label: '仪表盘' },
  posts: { name: '文章管理', icon: 'fas fa-file-alt', label: '文章管理' },
  comments: { name: '评论审核', icon: 'fas fa-comment-dots', label: '评论审核' },
  logs: { name: '操作日志', icon: 'fas fa-history', label: '操作日志' },
  theme: { name: '外观主题', icon: 'fas fa-palette', label: '外观主题' }
}

// 状态

const openedTabs = ref([])
const activeTabName = ref('')

// 计算当前显示的组件
const currentComponent = computed(() => {
  const tab = openedTabs.value.find(t => t.name === activeTabName.value)
  if (!tab) return Dashboard
  return pageComponentMap[tab.pageId] || Dashboard
})

// 主题相关
const isDarkTheme = computed(() => document.body.classList.contains('dark'))

// 打开页面
const openPage = (pageId) => {
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
}

// 关闭标签页
const handleTabRemove = (tabName) => {
  const idx = openedTabs.value.findIndex(t => t.name === tabName)
  if (idx === -1) return

  const wasActive = activeTabName.value === tabName
  openedTabs.value.splice(idx, 1)

  if (openedTabs.value.length === 0) {
    openPage('dashboard')
  } else if (wasActive) {
    const newActiveIdx = Math.min(idx, openedTabs.value.length - 1)
    activeTabName.value = openedTabs.value[newActiveIdx].name
  }
}

// 点击标签页切换
const handleTabClick = (tab) => {
  activeTabName.value = tab.paneName
  const tabData = openedTabs.value.find(t => t.name === tab.paneName)
  if (tabData) {
    activeMenu.value = tabData.pageId
  }
}




// 切换主题
const toggleTheme = () => {
  document.body.classList.toggle('dark')
  const isDark = document.body.classList.contains('dark')
  localStorage.setItem('flat_theme_pref', isDark ? 'dark' : 'light')
}

// 全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录
const handleLogout = () => {
  ElMessage.info('退出登录（演示模式）')
}

// 初始化数据
const initData = () => {
  if (!localStorage.getItem('flat_admin_posts')) {
    const defaultPosts = [
      { id: 1, title: 'Element Plus 集成实践', date: '2025-05-06', status: '已发布' },
      { id: 2, title: '博客自动化运维', date: '2025-05-04', status: '草稿' },
      { id: 3, title: '扁平化设计思考', date: '2025-05-02', status: '已发布' }
    ]
    localStorage.setItem('flat_admin_posts', JSON.stringify(defaultPosts))
  }
  if (!localStorage.getItem('flat_admin_comments')) {
    const defaultComments = [
      { id: 101, author: 'Flato', content: '界面简洁，所有图标都显示清晰', postTitle: 'Element Plus 集成实践', status: 'approved' },
      { id: 102, author: 'Nexus', content: '左侧菜单折叠很棒，图标显示正常', postTitle: '博客自动化运维', status: 'pending' },
      { id: 103, author: 'Elena', content: '体验流畅，图标完整', postTitle: '扁平化设计思考', status: 'pending' }
    ]
    localStorage.setItem('flat_admin_comments', JSON.stringify(defaultComments))
  }

  // const savedCollapsed = localStorage.getItem('nav_collapsed_flat')
  // if (savedCollapsed === 'true') isCollapsed.value = true

  const savedTheme = localStorage.getItem('flat_theme_pref')
  if (savedTheme === 'dark') document.body.classList.add('dark')

  //openPage('dashboard')
}

onMounted(() => {
  initData()
  window.dispatchEvent(new Event('storageUpdate'))
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #F1F5F9;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* 左侧导航区 */
.nav-sidebar {
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  transition: width 0.2s ease;
  width: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
}

.nav-sidebar.collapsed {
  width: 64px;
}

.nav-sidebar.collapsed .logo-text {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom: 1px solid #E9EEF3;
  margin-bottom: 8px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #0F172A;
}

.logo-area i {
  color: #3B82F6;
  font-size: 1.2rem;
}

.collapse-btn {
  background: #F1F5F9;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  font-size: 1rem;
  color: #475569;
}

.collapse-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

/* Element Plus 菜单样式覆盖 */
.el-menu {
  border-right: none !important;
  background: transparent !important;
}

.el-menu-item,
.el-sub-menu__title {
  height: 42px !important;
  line-height: 42px !important;
  margin: 2px 8px !important;
  border-radius: 6px !important;
  font-size: 0.85rem !important;
  color: #334155 !important;
}

.el-menu-item.is-active {
  background: #EFF6FF !important;
  color: #2563EB !important;
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
  background: #F1F5F9 !important;
  color: #2563EB !important;
}

.el-sub-menu .el-menu-item {
  padding-left: 44px !important;
}

.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-sub-menu__title {
  justify-content: center !important;
  text-align: center;
  padding: 0 !important;
}

.el-menu--collapse .el-menu-item i,
.el-menu--collapse .el-sub-menu__title i {
  margin-right: 0 !important;
  font-size: 1.1rem;
}

/* 右侧工作区 */
.right-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #F8FAFE;
}

/* 顶部栏 */
.top-action-bar {
  background: #FFFFFF;
  padding: 6px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
  height: 52px;
}

.btn-icon-group {
  display: flex;
  gap: 8px;
}

.btn-icon-group .el-button {
  font-size: 1.2rem;
  color: #5B6E8C;
}

.btn-icon-group .el-button:hover {
  color: #2563EB;
  background: #F1F5F9;
}

/* Element Plus Tabs 自定义样式 */
.custom-tabs {
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  padding: 0 16px;
}

.custom-tabs .el-tabs__header {
  margin: 0;
  border-bottom: none;
}

.custom-tabs .el-tabs__nav {
  border: none;
}

.custom-tabs .el-tabs__item {
  height: 44px;
  line-height: 44px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748B;
  border: none;
  border-bottom: 2px solid transparent;
  transition: 0.1s;
}

.custom-tabs .el-tabs__item.is-active {
  color: #2563EB;
  border-bottom-color: #2563EB;
}

.custom-tabs .el-tabs__item:hover {
  color: #2563EB;
  background: #F8FAFE;
}

.custom-tabs .el-tabs__item .is-icon-close {
  margin-left: 6px;
  font-size: 12px;
  opacity: 0.6;
}

.custom-tabs .el-tabs__item .is-icon-close:hover {
  opacity: 1;
  color: #EF4444;
}

.custom-tabs .el-tabs__nav-prev,
.custom-tabs .el-tabs__nav-next {
  line-height: 44px;
}

/* 内容面板 */
.content-pane {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

/* 卡片样式 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  padding: 16px 20px;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0F172A;
  margin-top: 8px;
}

.glass-panel {
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  margin-bottom: 20px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: #EFF6FF;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #1E40AF;
}

.badge-warning {
  background: #FEF3C7;
  color: #B45309;
}

/* 暗色主题 */


body.dark .nav-sidebar,
body.dark .top-action-bar,
body.dark .custom-tabs,
body.dark .stat-card,
body.dark .glass-panel {
  background: #1E293B;
  border-color: #334155;
}

body.dark .el-menu-item,
body.dark .el-sub-menu__title {
  color: #CBD5E1 !important;
}

body.dark .el-menu-item.is-active {
  background: #2D3A4E !important;
  color: #60A5FA !important;
}

body.dark .collapse-btn {
  background: #334155;
  color: #E2E8F0;
}

body.dark .right-workspace {
  background: #0F172A;
}

body.dark .stat-number {
  color: #F1F5F9;
}

body.dark .custom-tabs .el-tabs__item {
  color: #94A3B8;
}

body.dark .custom-tabs .el-tabs__item.is-active {
  color: #60A5FA;
}

body.dark .custom-tabs .el-tabs__item:hover {
  background: #2D3A4E;
}

body.dark .btn-icon-group .el-button {
  color: #94A3B8;
}

body.dark .btn-icon-group .el-button:hover {
  color: #60A5FA;
  background: #334155;
}
</style>