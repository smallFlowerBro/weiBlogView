<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="140px" class="prefs-form">
      <el-form-item label="站点名称">
        <el-input v-model="form.siteName" placeholder="请输入站点名称" style="width: 300px" />
      </el-form-item>
      <el-form-item label="站点描述">
        <el-input v-model="form.siteDescription" type="textarea" rows="2" style="width: 400px" />
      </el-form-item>
      <el-form-item label="站点关键词">
        <el-input v-model="form.siteKeywords" placeholder="多个关键词用英文逗号分隔" style="width: 400px" />
      </el-form-item>
      <el-form-item label="ICP备案号">
        <el-input v-model="form.icp" placeholder="浙ICP备xxxxxx号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="公安备案号">
        <el-input v-model="form.policeRecord" placeholder="浙公网安备xxxxxx号" style="width: 300px" />
      </el-form-item>
      <el-form-item label="时区">
        <el-select v-model="form.timezone" style="width: 300px">
          <el-option label="(UTC+8) 北京时间" value="Asia/Shanghai" />
          <el-option label="(UTC+0) 格林威治时间" value="UTC" />
          <el-option label="(UTC+9) 东京时间" value="Asia/Tokyo" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期格式">
        <el-select v-model="form.dateFormat" style="width: 200px">
          <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
          <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
          <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间格式">
        <el-select v-model="form.timeFormat" style="width: 200px">
          <el-option label="24小时制" value="HH:mm:ss" />
          <el-option label="12小时制" value="hh:mm:ss A" />
        </el-select>
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

const STORAGE_KEY = 'pref_basic'

const saving = ref(false)

const form = reactive({
  siteName: '我的博客',
  siteDescription: '分享技术，记录生活',
  siteKeywords: '博客,技术,编程,Vue,Java',
  icp: '',
  policeRecord: '',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss'
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('基础设置已保存')
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
</style>
