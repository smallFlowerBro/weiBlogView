<template>
  <div class="prefs-panel">
    <el-form :model="form" label-width="140px" class="prefs-form">
      <el-form-item label="存储方式">
        <el-radio-group v-model="form.storageType">
          <el-radio label="local">本地存储</el-radio>
          <el-radio label="aliyun">阿里云OSS</el-radio>
          <el-radio label="qcloud">腾讯云COS</el-radio>
          <el-radio label="qiniu">七牛云Kodo</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 本地存储 -->
      <template v-if="form.storageType === 'local'">
        <el-divider content-position="left">本地存储配置</el-divider>
        <el-form-item label="文件存储根目录">
          <el-input v-model="form.localRoot" placeholder="/var/www/uploads/" style="width: 400px" />
        </el-form-item>
        <el-form-item label="访问URL前缀">
          <el-input v-model="form.localUrlPrefix" placeholder="https://yourdomain.com/uploads/" style="width: 400px" />
        </el-form-item>
      </template>

      <!-- 阿里云OSS -->
      <template v-if="form.storageType === 'aliyun'">
        <el-divider content-position="left">阿里云OSS配置</el-divider>
        <el-form-item label="AccessKey ID">
          <el-input v-model="form.aliyunAccessKey" placeholder="请输入AccessKey ID" style="width: 400px" />
        </el-form-item>
        <el-form-item label="AccessKey Secret">
          <el-input v-model="form.aliyunSecret" type="password" show-password placeholder="请输入AccessKey Secret" style="width: 400px" />
        </el-form-item>
        <el-form-item label="Bucket名称">
          <el-input v-model="form.aliyunBucket" placeholder="请输入Bucket名称" style="width: 300px" />
        </el-form-item>
        <el-form-item label="Endpoint">
          <el-input v-model="form.aliyunEndpoint" placeholder="oss-cn-hangzhou.aliyuncs.com" style="width: 300px" />
        </el-form-item>
        <el-form-item label="CDN加速域名">
          <el-input v-model="form.aliyunCdn" placeholder="cdn.example.com" style="width: 300px" />
        </el-form-item>
      </template>

      <!-- 腾讯云COS -->
      <template v-if="form.storageType === 'qcloud'">
        <el-divider content-position="left">腾讯云COS配置</el-divider>
        <el-form-item label="SecretId">
          <el-input v-model="form.qcloudSecretId" placeholder="请输入SecretId" style="width: 400px" />
        </el-form-item>
        <el-form-item label="SecretKey">
          <el-input v-model="form.qcloudSecretKey" type="password" show-password placeholder="请输入SecretKey" style="width: 400px" />
        </el-form-item>
        <el-form-item label="Bucket名称">
          <el-input v-model="form.qcloudBucket" placeholder="bucket-appid" style="width: 300px" />
        </el-form-item>
        <el-form-item label="Region">
          <el-select v-model="form.qcloudRegion" style="width: 200px">
            <el-option label="广州" value="ap-guangzhou" />
            <el-option label="上海" value="ap-shanghai" />
            <el-option label="北京" value="ap-beijing" />
          </el-select>
        </el-form-item>
      </template>

      <el-divider content-position="left">CDN加速</el-divider>
      <el-form-item label="CDN加速开关">
        <el-switch v-model="form.cdnEnabled" />
        <div class="form-tip">开启后静态资源将通过CDN加速</div>
      </el-form-item>
      <el-form-item v-if="form.cdnEnabled" label="CDN域名">
        <el-input v-model="form.cdnDomain" placeholder="cdn.yourdomain.com" style="width: 300px" />
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

const STORAGE_KEY = 'pref_storage'

const saving = ref(false)

const form = reactive({
  storageType: 'local',
  localRoot: '/var/www/uploads/',
  localUrlPrefix: 'https://yourdomain.com/uploads/',
  aliyunAccessKey: '',
  aliyunSecret: '',
  aliyunBucket: '',
  aliyunEndpoint: 'oss-cn-hangzhou.aliyuncs.com',
  aliyunCdn: '',
  qcloudSecretId: '',
  qcloudSecretKey: '',
  qcloudBucket: '',
  qcloudRegion: 'ap-guangzhou',
  cdnEnabled: false,
  cdnDomain: ''
})

const save = async () => {
  saving.value = true
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    ElMessage.success('存储设置已保存')
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
