<template>
  <div class="glass-panel">
    <h3 style="font-size:1rem;"><i class="fas fa-palette"></i> 外观配置</h3>
    <p style="margin: 12px 0;">当前主题: <strong>{{ themeLabel }}</strong></p>
    <el-button type="primary" @click="switchTheme">
      <i class="fas fa-moon"></i> {{ themeBtnText }}
    </el-button>
    <div style="margin-top: 24px; border-top:1px solid #EDF2F7; padding-top:16px;">
      <i class="fas fa-info-circle"></i> 提示：左侧导航支持折叠，菜单项图标始终可见
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isDark = ref(false)

const themeLabel = computed(() => isDark.value ? '暗夜模式' : '日光模式（默认）')
const themeBtnText = computed(() => isDark.value ? '切换至日光模式' : '切换至暗夜模式')

const switchTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark-for-flat')
  localStorage.setItem('flat_theme_pref', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = document.body.classList.contains('dark-for-flat')
})
</script>