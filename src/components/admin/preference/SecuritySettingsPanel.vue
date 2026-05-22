<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="160px" class="prefs-form">
      <el-form-item label="登录验证码">
        <el-switch v-model="form.loginCaptcha" />
        <div class="form-tip">登录时需输入验证码</div>
      </el-form-item>
      <el-form-item label="登录失败限制">
        <el-switch v-model="form.loginLimit" />
      </el-form-item>
      <el-form-item v-if="form.loginLimit" label="最大失败次数">
        <el-input-number v-model="form.maxFailAttempts" :min="3" :max="10" />
      </el-form-item>
      <el-form-item v-if="form.loginLimit" label="锁定时长">
        <el-input-number v-model="form.lockTime" :min="5" :max="60" /> 分钟
      </el-form-item>
      <el-form-item label="会话超时">
        <el-input-number v-model="form.sessionTimeout" :min="30" :max="720" /> 分钟
      </el-form-item>
      <el-form-item label="IP白名单">
        <el-input v-model="form.ipWhitelist" type="textarea" rows="3" placeholder="每行一个IP地址" style="width: 400px" />
        <div class="form-tip">留空表示不限制</div>
      </el-form-item>
      <el-form-item label="API请求限制">
        <el-input-number v-model="form.apiRateLimit" :min="10" :max="1000" /> 次/分钟
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="saving">
          <i class="fas fa-save"></i> 保存设置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const STORAGE_KEY = 'pref_security'

const saving = ref(false)

const form = reactive({
  loginCaptcha: true,
  loginLimit: true,
  maxFailAttempts: 5,
  lockTime: 30,
  sessionTimeout: 120,
  ipWhitelist: '',
  apiRateLimit: 100
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('安全设置已保存')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) Object.assign(form, JSON.parse(saved))
})
</script>

<style scoped>
.prefs-panel { padding: 24px 28px; max-width: 900px; }
.prefs-form { margin-top: 8px; }
.form-tip { font-size: 12px; color: #94A3B8; margin-top: 4px; }
</style>
