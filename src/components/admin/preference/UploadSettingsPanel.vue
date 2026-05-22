<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="160px" class="prefs-form">
      <el-divider content-position="left">上传路径配置</el-divider>
      <el-form-item label="图片上传路径">
        <el-input v-model="form.imagePath" placeholder="/uploads/images/" style="width: 350px" />
        <div class="form-tip">相对于站点根目录的路径</div>
      </el-form-item>
      <el-form-item label="文件上传路径">
        <el-input v-model="form.filePath" placeholder="/uploads/files/" style="width: 350px" />
        <div class="form-tip">相对于站点根目录的路径</div>
      </el-form-item>
      <el-form-item label="头像上传路径">
        <el-input v-model="form.avatarPath" placeholder="/uploads/avatars/" style="width: 350px" />
        <div class="form-tip">用户头像存储目录</div>
      </el-form-item>
      <el-form-item label="封面图上传路径">
        <el-input v-model="form.coverPath" placeholder="/uploads/covers/" style="width: 350px" />
        <div class="form-tip">文章封面图存储目录</div>
      </el-form-item>

      <el-divider content-position="left">文件格式限制</el-divider>
      <el-form-item label="允许的图片格式">
        <el-select v-model="form.allowedImageTypes" multiple style="width: 400px">
          <el-option label="JPEG (.jpg, .jpeg)" value="image/jpeg" />
          <el-option label="PNG (.png)" value="image/png" />
          <el-option label="GIF (.gif)" value="image/gif" />
          <el-option label="WebP (.webp)" value="image/webp" />
          <el-option label="SVG (.svg)" value="image/svg+xml" />
        </el-select>
      </el-form-item>
      <el-form-item label="允许的文件格式">
        <el-select v-model="form.allowedFileTypes" multiple style="width: 400px">
          <el-option label="PDF (.pdf)" value="application/pdf" />
          <el-option label="Word (.doc, .docx)" value="application/msword" />
          <el-option label="Excel (.xls, .xlsx)" value="application/vnd.ms-excel" />
          <el-option label="ZIP (.zip)" value="application/zip" />
          <el-option label="文本 (.txt)" value="text/plain" />
        </el-select>
      </el-form-item>
      <el-form-item label="单文件最大尺寸">
        <el-input-number v-model="form.maxFileSize" :min="1" :max="100" /> MB
      </el-form-item>

      <el-divider content-position="left">图片处理</el-divider>
      <el-form-item label="图片质量压缩">
        <el-slider v-model="form.imageQuality" :min="1" :max="100" style="width: 300px" />
        <div class="form-tip">1-100，数值越小压缩率越高</div>
      </el-form-item>
      <el-form-item label="自动水印">
        <el-switch v-model="form.autoWatermark" />
      </el-form-item>
      <el-form-item v-if="form.autoWatermark" label="水印文字">
        <el-input v-model="form.watermarkText" placeholder="请输入水印文字" style="width: 300px" />
      </el-form-item>
      <el-form-item v-if="form.autoWatermark" label="水印位置">
        <el-select v-model="form.watermarkPosition" style="width: 150px">
          <el-option label="左上角" value="top-left" />
          <el-option label="右上角" value="top-right" />
          <el-option label="居中" value="center" />
          <el-option label="左下角" value="bottom-left" />
          <el-option label="右下角" value="bottom-right" />
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

const STORAGE_KEY = 'pref_upload'

const saving = ref(false)

const form = reactive({
  imagePath: '/uploads/images/',
  filePath: '/uploads/files/',
  avatarPath: '/uploads/avatars/',
  coverPath: '/uploads/covers/',
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
  allowedFileTypes: ['application/pdf', 'application/zip'],
  maxFileSize: 10,
  imageQuality: 80,
  autoWatermark: false,
  watermarkText: '@我的博客',
  watermarkPosition: 'bottom-right'
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('上传设置已保存')
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
