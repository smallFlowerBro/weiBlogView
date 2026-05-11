<template>
  <div class="nav-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-area" v-if="!isCollapsed">
        <i class="fas fa-terminal"  ></i>
        <span class="logo-text" >运维控制台</span>
      </div>
      <button class="collapse-btn" @click="toggleCollapse">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <el-menu
        :default-active="menu.activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="false"
        @select="handleMenuSelect"
        unique-opened
    >

      <el-menu-item index="dashboard">
        <i class="fas fa-tachometer-alt"></i>&nbsp;&nbsp;
        <span>仪表盘</span>
      </el-menu-item>
      <el-sub-menu index="content">
        <template #title>
          <i class="fas fa-folder-open"></i>&nbsp;&nbsp;
          <span>内容管理</span>
        </template>
        <el-menu-item index="posts">
          <i class="fas fa-file-alt"></i> &nbsp;&nbsp;
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="comments">
          <i class="fas fa-comment-dots"></i>&nbsp;&nbsp;
          <span>评论审核</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="settings">
        <template #title>
          <i class="fas fa-sliders-h"></i>&nbsp;&nbsp;
          <span>系统设置</span>
        </template>
        <el-menu-item index="logs">
          <i class="fas fa-history"></i>&nbsp;&nbsp;
          <span>操作日志</span>
        </el-menu-item>
        <el-menu-item index="theme">
          <i class="fas fa-palette"></i>&nbsp;&nbsp;
          <span>外观主题</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>

  import {ref} from "vue";
  import {menuAndTabStore} from "@/store/menuAndTabStore.js";

  let isCollapsed = ref(false)
  let menu = menuAndTabStore();
  // 折叠导航
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  // 菜单选择
  const handleMenuSelect = (index) => {
    if (index === 'content' || index === 'settings') return
    menu.openPage(index)
  }
</script>
<style scoped>
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
</style>