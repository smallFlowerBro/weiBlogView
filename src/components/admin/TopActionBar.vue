<template>
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
</template>
<script setup>

// 主题相关
import {computed} from "vue";
import {ElMessage} from "element-plus";

const isDarkTheme = computed(() => document.body.classList.contains('dark'))
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
</script>
<style scoped>
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
</style>