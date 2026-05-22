<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="120px" class="prefs-form">
      <el-form-item label="默认主题">
        <el-radio-group v-model="form.defaultTheme" @change="applyTheme">
          <el-radio-button label="light">
            <i class="fas fa-sun"></i> 日光模式
          </el-radio-button>
          <el-radio-button label="dark">
            <i class="fas fa-moon"></i> 暗夜模式
          </el-radio-button>
          <el-radio-button label="auto">
            <i class="fas fa-adjust"></i> 跟随系统
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主题色">
        <el-color-picker v-model="form.primaryColor" @change="applyPrimaryColor" />
        <div class="form-tip" :style="{ color: form.primaryColor }">当前主题色：{{ form.primaryColor }}</div>
      </el-form-item>
      <el-form-item label="侧边栏样式">
        <el-radio-group v-model="form.sidebarStyle">
          <el-radio-button label="light">浅色</el-radio-button>
          <el-radio-button label="dark">深色</el-radio-button>
          <el-radio-button label="blur">毛玻璃</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单布局">
        <el-radio-group v-model="form.menuLayout">
          <el-radio-button label="vertical">垂直导航</el-radio-button>
          <el-radio-button label="horizontal">水平导航</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="圆角大小">
        <el-slider v-model="form.borderRadius" :min="0" :max="16" style="width: 300px" />
        <div class="form-tip">{{ form.borderRadius }}px</div>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-select v-model="form.fontSize" style="width: 150px">
          <el-option label="小" value="small" />
          <el-option label="中" value="medium" />
          <el-option label="大" value="large" />
        </el-select>
      </el-form-item>
      <el-form-item label="动画效果">
        <el-switch v-model="form.animation" />
        <div class="form-tip">开启后页面过渡动画</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="saving">
          <i class="fas fa-save"></i> 保存设置
        </el-button>
        <el-button @click="reset">恢复默认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const STORAGE_KEY = 'pref_theme'

const DEFAULT = {
  defaultTheme: 'light',
  primaryColor: '#3B82F6',
  sidebarStyle: 'light',
  menuLayout: 'vertical',
  borderRadius: 8,
  fontSize: 'medium',
  animation: true
}

const saving = ref(false)
const form = reactive({ ...DEFAULT })

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark')
  } else if (theme === 'light') {
    document.body.classList.remove('dark')
  } else if (theme === 'auto') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.body.classList.toggle('dark', isDark)
  }
}

const applyPrimaryColor = (color) => {
  document.documentElement.style.setProperty('--el-color-primary', color)
}

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('主题设置已保存')
  } finally {
    saving.value = false
  }
}

const reset = () => {
  Object.assign(form, DEFAULT)
  applyTheme(form.defaultTheme)
  applyPrimaryColor(form.primaryColor)
  save()
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) Object.assign(form, JSON.parse(saved))
  applyTheme(form.defaultTheme)
  applyPrimaryColor(form.primaryColor)
})
</script>

<style scoped>
.prefs-panel { padding: 24px 28px; max-width: 900px; }
.prefs-form { margin-top: 8px; }
.form-tip { font-size: 12px; color: #94A3B8; margin-top: 4px; }
</style>
