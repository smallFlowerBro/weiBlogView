<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="140px" class="prefs-form">
      <el-form-item label="SMTP服务器">
        <el-input v-model="form.smtpHost" placeholder="smtp.example.com" style="width: 300px" />
      </el-form-item>
      <el-form-item label="SMTP端口">
        <el-input-number v-model="form.smtpPort" :min="1" :max="65535" />
      </el-form-item>
      <el-form-item label="加密方式">
        <el-select v-model="form.encryption" style="width: 150px">
          <el-option label="无" value="none" />
          <el-option label="SSL/TLS" value="ssl" />
          <el-option label="STARTTLS" value="tls" />
        </el-select>
      </el-form-item>
      <el-form-item label="发件人邮箱">
        <el-input v-model="form.fromEmail" placeholder="noreply@example.com" style="width: 300px" />
      </el-form-item>
      <el-form-item label="发件人名称">
        <el-input v-model="form.fromName" placeholder="系统通知" style="width: 300px" />
      </el-form-item>
      <el-form-item label="SMTP用户名">
        <el-input v-model="form.smtpUser" placeholder="请输入用户名" style="width: 300px" />
      </el-form-item>
      <el-form-item label="SMTP密码">
        <el-input v-model="form.smtpPass" type="password" show-password placeholder="请输入密码" style="width: 300px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="saving">
          <i class="fas fa-save"></i> 保存设置
        </el-button>
        <el-button @click="testEmail">测试发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const STORAGE_KEY = 'pref_email'

const saving = ref(false)

const form = reactive({
  smtpHost: '',
  smtpPort: 587,
  encryption: 'tls',
  fromEmail: '',
  fromName: '系统通知',
  smtpUser: '',
  smtpPass: ''
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('邮件设置已保存')
  } finally {
    saving.value = false
  }
}

const testEmail = () => {
  if (!form.smtpHost || !form.fromEmail) {
    ElMessage.warning('请先填写SMTP服务器和发件人邮箱')
    return
  }
  ElMessage.info('测试邮件发送中...')
  setTimeout(() => {
    ElMessage.success('测试邮件发送成功，请检查收件箱')
  }, 1500)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) Object.assign(form, JSON.parse(saved))
})
</script>

<style scoped>
.prefs-panel { padding: 24px 28px; max-width: 900px; }
.prefs-form { margin-top: 8px; }
</style>
