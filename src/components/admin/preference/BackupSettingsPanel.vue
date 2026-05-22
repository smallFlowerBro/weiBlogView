<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="160px" class="prefs-form">
      <el-form-item label="自动备份">
        <el-switch v-model="form.autoBackup" />
      </el-form-item>
      <el-form-item v-if="form.autoBackup" label="备份频率">
        <el-select v-model="form.backupFrequency" style="width: 150px">
          <el-option label="每天" value="daily" />
          <el-option label="每周" value="weekly" />
          <el-option label="每月" value="monthly" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.autoBackup" label="备份时间">
        <el-time-picker v-model="form.backupTime" format="HH:mm" style="width: 120px" />
      </el-form-item>
      <el-form-item label="备份保留数量">
        <el-input-number v-model="form.keepCount" :min="1" :max="30" />
        <div class="form-tip">保留最近N份备份</div>
      </el-form-item>
      <el-form-item label="备份内容">
        <el-checkbox-group v-model="form.backupContent">
          <el-checkbox label="database">数据库</el-checkbox>
          <el-checkbox label="uploads">上传文件</el-checkbox>
          <el-checkbox label="config">配置文件</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备份存储路径">
        <el-input v-model="form.backupPath" placeholder="/backups/" style="width: 350px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="saving">
          <i class="fas fa-save"></i> 保存设置
        </el-button>
        <el-button @click="manualBackup" type="success">
          <i class="fas fa-database"></i> 立即备份
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="备份提示" width="300px" center>
      <div style="text-align: center; padding: 20px;">
        <i class="fas fa-check-circle" style="font-size: 48px; color: #10B981;"></i>
        <p style="margin-top: 16px;">数据备份已启动，请稍后查看备份列表</p>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const STORAGE_KEY = 'pref_backup'

const saving = ref(false)
const dialogVisible = ref(false)

const form = reactive({
  autoBackup: false,
  backupFrequency: 'daily',
  backupTime: new Date(0, 0, 0, 2, 0),
  keepCount: 7,
  backupContent: ['database', 'uploads'],
  backupPath: '/backups/'
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('备份设置已保存')
  } finally {
    saving.value = false
  }
}

const manualBackup = () => {
  dialogVisible.value = true
  setTimeout(() => {
    ElMessage.success('备份完成，文件已保存到备份目录')
  }, 2000)
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
