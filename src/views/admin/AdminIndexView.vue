<template>
  <div class="app-wrapper">
    <!-- 左侧导航区 -->
    <nav-sidebar></nav-sidebar>

    <!-- 右侧工作区 -->
    <div class="right-workspace">
      <!-- 顶部栏 -->
      <top-action-bar></top-action-bar>
      <!-- Element Plus Tabs 多标签页 -->
      <top-tabs-bar></top-tabs-bar>

      <!-- 动态内容区域 -->
<!--      <div class="content-pane">-->
<!--        <component :is="currentComponent" :key="activeTabName" />-->
<!--      </div>-->
      <div class="content-pane">
        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import NavSidebar from "@/components/admin/NavSidebar.vue";
import TopActionBar from "@/components/admin/TopActionBar.vue";
import TopTabsBar from "@/components/admin/TopTabsBar.vue";

import {menuAndTabStore} from "@/store/menuAndTabStore.js";

let menuAndTab = menuAndTabStore();

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

  menuAndTab.openPage('dashboard')
}

onMounted(() => {
  // 模拟数据初始化
  initData()
  window.dispatchEvent(new Event('storageUpdate'))
})
</script>

<style>
.app-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* 右侧工作区 */
.right-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--admin-bg-workspace);
}

/* Element Plus Tabs 自定义样式 */
.custom-tabs {
  background: var(--admin-bg-tabs);
  border-bottom: 1px solid var(--admin-border);
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
  color: var(--admin-tabs-item);
  border: none;
  border-bottom: 2px solid transparent;
  transition: 0.1s;
}

.custom-tabs .el-tabs__item.is-active {
  color: var(--admin-tabs-active);
  border-bottom-color: var(--admin-tabs-active);
}

.custom-tabs .el-tabs__item:hover {
  color: var(--admin-tabs-active);
  background: var(--admin-tabs-hover-bg);
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
  background: var(--admin-bg-card);
  border-radius: 8px;
  border: 1px solid var(--admin-border);
  padding: 16px 20px;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--admin-text);
  margin-top: 8px;
}

.glass-panel {
  background: var(--admin-bg-card);
  border-radius: 8px;
  border: 1px solid var(--admin-border);
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
</style>