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
        :default-active="activeMenu"
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
<style scoped>

</style>
<script setup>

import {ref} from "vue";

const isCollapsed = ref(false)
const activeMenu = ref('dashboard')

// 折叠导航
const toggleCollapse = () => {
  console.log(isCollapsed.value)
  isCollapsed.value = !isCollapsed.value
  // localStorage.setItem('nav_collapsed_flat', isCollapsed.value ? 'true' : 'false')
}

// 菜单选择
const handleMenuSelect = (index) => {
  if (index === 'content' || index === 'settings') return
  //openPage(index)
}




</script>