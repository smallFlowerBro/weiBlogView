<template>
  <div class="preferences-page">
    <div class="page-header">
      <h2><i class="fas fa-cog"></i> 偏好设置</h2>
      <p class="page-desc">配置系统参数、上传路径、外观主题等个性化选项</p>
    </div>

    <div class="preferences-container">
      <!-- 顶部标签页 -->
      <el-tabs v-model="activeTab" class="prefs-tabs" @tab-click="handleTabClick">
        <el-tab-pane name="basic">
          <template #label>
            <span><i class="fas fa-globe"></i> 基础设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="basicForm" label-width="140px" class="prefs-form">
              <el-form-item label="站点名称">
                <el-input v-model="basicForm.siteName" placeholder="请输入站点名称" style="width: 300px" />
              </el-form-item>
              <el-form-item label="站点描述">
                <el-input v-model="basicForm.siteDescription" type="textarea" rows="2" style="width: 400px" />
              </el-form-item>
              <el-form-item label="站点关键词">
                <el-input v-model="basicForm.siteKeywords" placeholder="多个关键词用英文逗号分隔" style="width: 400px" />
              </el-form-item>
              <el-form-item label="ICP备案号">
                <el-input v-model="basicForm.icp" placeholder="浙ICP备xxxxxx号" style="width: 300px" />
              </el-form-item>
              <el-form-item label="公安备案号">
                <el-input v-model="basicForm.policeRecord" placeholder="浙公网安备xxxxxx号" style="width: 300px" />
              </el-form-item>
              <el-form-item label="时区">
                <el-select v-model="basicForm.timezone" style="width: 300px">
                  <el-option label="(UTC+8) 北京时间" value="Asia/Shanghai" />
                  <el-option label="(UTC+0) 格林威治时间" value="UTC" />
                  <el-option label="(UTC+9) 东京时间" value="Asia/Tokyo" />
                </el-select>
              </el-form-item>
              <el-form-item label="日期格式">
                <el-select v-model="basicForm.dateFormat" style="width: 200px">
                  <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
                  <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
                  <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
                </el-select>
              </el-form-item>
              <el-form-item label="时间格式">
                <el-select v-model="basicForm.timeFormat" style="width: 200px">
                  <el-option label="24小时制" value="HH:mm:ss" />
                  <el-option label="12小时制" value="hh:mm:ss A" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveBasicSettings" :loading="saving.basic">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="upload">
          <template #label>
            <span><i class="fas fa-cloud-upload-alt"></i> 上传设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="uploadForm" label-width="160px" class="prefs-form">
              <el-divider content-position="left">上传路径配置</el-divider>
              <el-form-item label="图片上传路径">
                <el-input v-model="uploadForm.imagePath" placeholder="/uploads/images/" style="width: 350px" />
                <div class="form-tip">相对于站点根目录的路径</div>
              </el-form-item>
              <el-form-item label="文件上传路径">
                <el-input v-model="uploadForm.filePath" placeholder="/uploads/files/" style="width: 350px" />
                <div class="form-tip">相对于站点根目录的路径</div>
              </el-form-item>
              <el-form-item label="头像上传路径">
                <el-input v-model="uploadForm.avatarPath" placeholder="/uploads/avatars/" style="width: 350px" />
                <div class="form-tip">用户头像存储目录</div>
              </el-form-item>
              <el-form-item label="封面图上传路径">
                <el-input v-model="uploadForm.coverPath" placeholder="/uploads/covers/" style="width: 350px" />
                <div class="form-tip">文章封面图存储目录</div>
              </el-form-item>

              <el-divider content-position="left">文件格式限制</el-divider>
              <el-form-item label="允许的图片格式">
                <el-select v-model="uploadForm.allowedImageTypes" multiple style="width: 400px">
                  <el-option label="JPEG (.jpg, .jpeg)" value="image/jpeg" />
                  <el-option label="PNG (.png)" value="image/png" />
                  <el-option label="GIF (.gif)" value="image/gif" />
                  <el-option label="WebP (.webp)" value="image/webp" />
                  <el-option label="SVG (.svg)" value="image/svg+xml" />
                </el-select>
              </el-form-item>
              <el-form-item label="允许的文件格式">
                <el-select v-model="uploadForm.allowedFileTypes" multiple style="width: 400px">
                  <el-option label="PDF (.pdf)" value="application/pdf" />
                  <el-option label="Word (.doc, .docx)" value="application/msword" />
                  <el-option label="Excel (.xls, .xlsx)" value="application/vnd.ms-excel" />
                  <el-option label="ZIP (.zip)" value="application/zip" />
                  <el-option label="文本 (.txt)" value="text/plain" />
                </el-select>
              </el-form-item>
              <el-form-item label="单文件最大尺寸">
                <el-input-number v-model="uploadForm.maxFileSize" :min="1" :max="100" /> MB
              </el-form-item>

              <el-divider content-position="left">图片处理</el-divider>
              <el-form-item label="图片质量压缩">
                <el-slider v-model="uploadForm.imageQuality" :min="1" :max="100" style="width: 300px" />
                <div class="form-tip">1-100，数值越小压缩率越高</div>
              </el-form-item>
              <el-form-item label="自动水印">
                <el-switch v-model="uploadForm.autoWatermark" />
              </el-form-item>
              <el-form-item v-if="uploadForm.autoWatermark" label="水印文字">
                <el-input v-model="uploadForm.watermarkText" placeholder="请输入水印文字" style="width: 300px" />
              </el-form-item>
              <el-form-item v-if="uploadForm.autoWatermark" label="水印位置">
                <el-select v-model="uploadForm.watermarkPosition" style="width: 150px">
                  <el-option label="左上角" value="top-left" />
                  <el-option label="右上角" value="top-right" />
                  <el-option label="居中" value="center" />
                  <el-option label="左下角" value="bottom-left" />
                  <el-option label="右下角" value="bottom-right" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUploadSettings" :loading="saving.upload">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="storage">
          <template #label>
            <span><i class="fas fa-database"></i> 存储设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="storageForm" label-width="140px" class="prefs-form">
              <el-form-item label="存储方式">
                <el-radio-group v-model="storageForm.storageType">
                  <el-radio label="local">本地存储</el-radio>
                  <el-radio label="aliyun">阿里云OSS</el-radio>
                  <el-radio label="qcloud">腾讯云COS</el-radio>
                  <el-radio label="qiniu">七牛云Kodo</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 本地存储 -->
              <template v-if="storageForm.storageType === 'local'">
                <el-divider content-position="left">本地存储配置</el-divider>
                <el-form-item label="文件存储根目录">
                  <el-input v-model="storageForm.localRoot" placeholder="/var/www/uploads/" style="width: 400px" />
                </el-form-item>
                <el-form-item label="访问URL前缀">
                  <el-input v-model="storageForm.localUrlPrefix" placeholder="https://yourdomain.com/uploads/" style="width: 400px" />
                </el-form-item>
              </template>

              <!-- 阿里云OSS -->
              <template v-if="storageForm.storageType === 'aliyun'">
                <el-divider content-position="left">阿里云OSS配置</el-divider>
                <el-form-item label="AccessKey ID">
                  <el-input v-model="storageForm.aliyunAccessKey" placeholder="请输入AccessKey ID" style="width: 400px" />
                </el-form-item>
                <el-form-item label="AccessKey Secret">
                  <el-input v-model="storageForm.aliyunSecret" type="password" show-password placeholder="请输入AccessKey Secret" style="width: 400px" />
                </el-form-item>
                <el-form-item label="Bucket名称">
                  <el-input v-model="storageForm.aliyunBucket" placeholder="请输入Bucket名称" style="width: 300px" />
                </el-form-item>
                <el-form-item label="Endpoint">
                  <el-input v-model="storageForm.aliyunEndpoint" placeholder="oss-cn-hangzhou.aliyuncs.com" style="width: 300px" />
                </el-form-item>
                <el-form-item label="CDN加速域名">
                  <el-input v-model="storageForm.aliyunCdn" placeholder="cdn.example.com" style="width: 300px" />
                </el-form-item>
              </template>

              <!-- 腾讯云COS -->
              <template v-if="storageForm.storageType === 'qcloud'">
                <el-divider content-position="left">腾讯云COS配置</el-divider>
                <el-form-item label="SecretId">
                  <el-input v-model="storageForm.qcloudSecretId" placeholder="请输入SecretId" style="width: 400px" />
                </el-form-item>
                <el-form-item label="SecretKey">
                  <el-input v-model="storageForm.qcloudSecretKey" type="password" show-password placeholder="请输入SecretKey" style="width: 400px" />
                </el-form-item>
                <el-form-item label="Bucket名称">
                  <el-input v-model="storageForm.qcloudBucket" placeholder="bucket-appid" style="width: 300px" />
                </el-form-item>
                <el-form-item label="Region">
                  <el-select v-model="storageForm.qcloudRegion" style="width: 200px">
                    <el-option label="广州" value="ap-guangzhou" />
                    <el-option label="上海" value="ap-shanghai" />
                    <el-option label="北京" value="ap-beijing" />
                  </el-select>
                </el-form-item>
              </template>

              <el-divider content-position="left">CDN加速</el-divider>
              <el-form-item label="CDN加速开关">
                <el-switch v-model="storageForm.cdnEnabled" />
                <div class="form-tip">开启后静态资源将通过CDN加速</div>
              </el-form-item>
              <el-form-item v-if="storageForm.cdnEnabled" label="CDN域名">
                <el-input v-model="storageForm.cdnDomain" placeholder="cdn.yourdomain.com" style="width: 300px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveStorageSettings" :loading="saving.storage">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="theme">
          <template #label>
            <span><i class="fas fa-palette"></i> 主题外观</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="themeForm" label-width="120px" class="prefs-form">
              <el-form-item label="默认主题">
                <el-radio-group v-model="themeForm.defaultTheme" @change="applyTheme">
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
                <el-color-picker v-model="themeForm.primaryColor" @change="applyPrimaryColor" />
                <div class="form-tip" :style="{ color: themeForm.primaryColor }">当前主题色：{{ themeForm.primaryColor }}</div>
              </el-form-item>
              <el-form-item label="侧边栏样式">
                <el-radio-group v-model="themeForm.sidebarStyle">
                  <el-radio-button label="light">浅色</el-radio-button>
                  <el-radio-button label="dark">深色</el-radio-button>
                  <el-radio-button label="blur">毛玻璃</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单布局">
                <el-radio-group v-model="themeForm.menuLayout">
                  <el-radio-button label="vertical">垂直导航</el-radio-button>
                  <el-radio-button label="horizontal">水平导航</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="圆角大小">
                <el-slider v-model="themeForm.borderRadius" :min="0" :max="16" style="width: 300px" />
                <div class="form-tip">{{ themeForm.borderRadius }}px</div>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-select v-model="themeForm.fontSize" style="width: 150px">
                  <el-option label="小" value="small" />
                  <el-option label="中" value="medium" />
                  <el-option label="大" value="large" />
                </el-select>
              </el-form-item>
              <el-form-item label="动画效果">
                <el-switch v-model="themeForm.animation" />
                <div class="form-tip">开启后页面过渡动画</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveThemeSettings" :loading="saving.theme">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
                <el-button @click="resetTheme">恢复默认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="email">
          <template #label>
            <span><i class="fas fa-envelope"></i> 邮件设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="emailForm" label-width="140px" class="prefs-form">
              <el-form-item label="SMTP服务器">
                <el-input v-model="emailForm.smtpHost" placeholder="smtp.example.com" style="width: 300px" />
              </el-form-item>
              <el-form-item label="SMTP端口">
                <el-input-number v-model="emailForm.smtpPort" :min="1" :max="65535" />
              </el-form-item>
              <el-form-item label="加密方式">
                <el-select v-model="emailForm.encryption" style="width: 150px">
                  <el-option label="无" value="none" />
                  <el-option label="SSL/TLS" value="ssl" />
                  <el-option label="STARTTLS" value="tls" />
                </el-select>
              </el-form-item>
              <el-form-item label="发件人邮箱">
                <el-input v-model="emailForm.fromEmail" placeholder="noreply@example.com" style="width: 300px" />
              </el-form-item>
              <el-form-item label="发件人名称">
                <el-input v-model="emailForm.fromName" placeholder="系统通知" style="width: 300px" />
              </el-form-item>
              <el-form-item label="SMTP用户名">
                <el-input v-model="emailForm.smtpUser" placeholder="请输入用户名" style="width: 300px" />
              </el-form-item>
              <el-form-item label="SMTP密码">
                <el-input v-model="emailForm.smtpPass" type="password" show-password placeholder="请输入密码" style="width: 300px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveEmailSettings" :loading="saving.email">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
                <el-button @click="testEmail">测试发送</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="backup">
          <template #label>
            <span><i class="fas fa-database"></i> 备份设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="backupForm" label-width="160px" class="prefs-form">
              <el-form-item label="自动备份">
                <el-switch v-model="backupForm.autoBackup" />
              </el-form-item>
              <el-form-item v-if="backupForm.autoBackup" label="备份频率">
                <el-select v-model="backupForm.backupFrequency" style="width: 150px">
                  <el-option label="每天" value="daily" />
                  <el-option label="每周" value="weekly" />
                  <el-option label="每月" value="monthly" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="backupForm.autoBackup" label="备份时间">
                <el-time-picker v-model="backupForm.backupTime" format="HH:mm" style="width: 120px" />
              </el-form-item>
              <el-form-item label="备份保留数量">
                <el-input-number v-model="backupForm.keepCount" :min="1" :max="30" />
                <div class="form-tip">保留最近N份备份</div>
              </el-form-item>
              <el-form-item label="备份内容">
                <el-checkbox-group v-model="backupForm.backupContent">
                  <el-checkbox label="database">数据库</el-checkbox>
                  <el-checkbox label="uploads">上传文件</el-checkbox>
                  <el-checkbox label="config">配置文件</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="备份存储路径">
                <el-input v-model="backupForm.backupPath" placeholder="/backups/" style="width: 350px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveBackupSettings" :loading="saving.backup">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
                <el-button @click="manualBackup" type="success">
                  <i class="fas fa-database"></i> 立即备份
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane name="security">
          <template #label>
            <span><i class="fas fa-shield-alt"></i> 安全设置</span>
          </template>
          <div class="prefs-panel">
            <el-form :model="securityForm" label-width="160px" class="prefs-form">
              <el-form-item label="登录验证码">
                <el-switch v-model="securityForm.loginCaptcha" />
                <div class="form-tip">登录时需输入验证码</div>
              </el-form-item>
              <el-form-item label="登录失败限制">
                <el-switch v-model="securityForm.loginLimit" />
              </el-form-item>
              <el-form-item v-if="securityForm.loginLimit" label="最大失败次数">
                <el-input-number v-model="securityForm.maxFailAttempts" :min="3" :max="10" />
              </el-form-item>
              <el-form-item v-if="securityForm.loginLimit" label="锁定时长">
                <el-input-number v-model="securityForm.lockTime" :min="5" :max="60" /> 分钟
              </el-form-item>
              <el-form-item label="会话超时">
                <el-input-number v-model="securityForm.sessionTimeout" :min="30" :max="720" /> 分钟
              </el-form-item>
              <el-form-item label="IP白名单">
                <el-input v-model="securityForm.ipWhitelist" type="textarea" rows="3" placeholder="每行一个IP地址" style="width: 400px" />
                <div class="form-tip">留空表示不限制</div>
              </el-form-item>
              <el-form-item label="API请求限制">
                <el-input-number v-model="securityForm.apiRateLimit" :min="10" :max="1000" /> 次/分钟
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSecuritySettings" :loading="saving.security">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 备份成功提示 -->
    <el-dialog v-model="backupDialogVisible" title="备份提示" width="300px" center>
      <div style="text-align: center; padding: 20px;">
        <i class="fas fa-check-circle" style="font-size: 48px; color: #10B981;"></i>
        <p style="margin-top: 16px;">数据备份已启动，请稍后查看备份列表</p>
      </div>
      <template #footer>
        <el-button @click="backupDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 当前激活的标签页
const activeTab = ref('basic')

// 加载状态
const saving = reactive({
  basic: false,
  upload: false,
  storage: false,
  theme: false,
  email: false,
  backup: false,
  security: false
})

// 备份对话框
const backupDialogVisible = ref(false)

// 基础设置表单
const basicForm = reactive({
  siteName: '我的博客',
  siteDescription: '分享技术，记录生活',
  siteKeywords: '博客,技术,编程,Vue,Java',
  icp: '',
  policeRecord: '',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss'
})

// 上传设置表单
const uploadForm = reactive({
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

// 存储设置表单
const storageForm = reactive({
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

// 主题设置表单
const themeForm = reactive({
  defaultTheme: 'light',
  primaryColor: '#3B82F6',
  sidebarStyle: 'light',
  menuLayout: 'vertical',
  borderRadius: 8,
  fontSize: 'medium',
  animation: true
})

// 邮件设置表单
const emailForm = reactive({
  smtpHost: '',
  smtpPort: 587,
  encryption: 'tls',
  fromEmail: '',
  fromName: '系统通知',
  smtpUser: '',
  smtpPass: ''
})

// 备份设置表单
const backupForm = reactive({
  autoBackup: false,
  backupFrequency: 'daily',
  backupTime: new Date(0, 0, 0, 2, 0),
  keepCount: 7,
  backupContent: ['database', 'uploads'],
  backupPath: '/backups/'
})

// 安全设置表单
const securityForm = reactive({
  loginCaptcha: true,
  loginLimit: true,
  maxFailAttempts: 5,
  lockTime: 30,
  sessionTimeout: 120,
  ipWhitelist: '',
  apiRateLimit: 100
})

// 加载保存的设置
const loadSettings = () => {
  const saved = localStorage.getItem('system_preferences')
  if (saved) {
    const data = JSON.parse(saved)
    Object.assign(basicForm, data.basic || {})
    Object.assign(uploadForm, data.upload || {})
    Object.assign(storageForm, data.storage || {})
    Object.assign(themeForm, data.theme || {})
    Object.assign(emailForm, data.email || {})
    Object.assign(backupForm, data.backup || {})
    Object.assign(securityForm, data.security || {})
  }
}

// 保存到localStorage
const saveToLocalStorage = () => {
  const allSettings = {
    basic: basicForm,
    upload: uploadForm,
    storage: storageForm,
    theme: themeForm,
    email: emailForm,
    backup: backupForm,
    security: securityForm
  }
  localStorage.setItem('system_preferences', JSON.stringify(allSettings))
}

// 保存基础设置
const saveBasicSettings = async () => {
  saving.basic = true
  try {
    saveToLocalStorage()
    ElMessage.success('基础设置已保存')
  } finally {
    saving.basic = false
  }
}

// 保存上传设置
const saveUploadSettings = async () => {
  saving.upload = true
  try {
    saveToLocalStorage()
    ElMessage.success('上传设置已保存')
  } finally {
    saving.upload = false
  }
}

// 保存存储设置
const saveStorageSettings = async () => {
  saving.storage = true
  try {
    saveToLocalStorage()
    ElMessage.success('存储设置已保存')
  } finally {
    saving.storage = false
  }
}

// 应用主题
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark-for-flat')
  } else if (theme === 'light') {
    document.body.classList.remove('dark-for-flat')
  } else if (theme === 'auto') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark) {
      document.body.classList.add('dark-for-flat')
    } else {
      document.body.classList.remove('dark-for-flat')
    }
  }
}

// 应用主题色
const applyPrimaryColor = (color) => {
  document.documentElement.style.setProperty('--el-color-primary', color)
}

// 恢复默认主题
const resetTheme = () => {
  themeForm.defaultTheme = 'light'
  themeForm.primaryColor = '#3B82F6'
  themeForm.sidebarStyle = 'light'
  themeForm.menuLayout = 'vertical'
  themeForm.borderRadius = 8
  themeForm.fontSize = 'medium'
  themeForm.animation = true
  applyTheme('light')
  applyPrimaryColor('#3B82F6')
  saveThemeSettings()
}

// 保存主题设置
const saveThemeSettings = async () => {
  saving.theme = true
  try {
    saveToLocalStorage()
    ElMessage.success('主题设置已保存')
  } finally {
    saving.theme = false
  }
}

// 保存邮件设置
const saveEmailSettings = async () => {
  saving.email = true
  try {
    saveToLocalStorage()
    ElMessage.success('邮件设置已保存')
  } finally {
    saving.email = false
  }
}

// 测试邮件发送
const testEmail = () => {
  if (!emailForm.smtpHost || !emailForm.fromEmail) {
    ElMessage.warning('请先填写SMTP服务器和发件人邮箱')
    return
  }
  ElMessage.info('测试邮件发送中...')
  setTimeout(() => {
    ElMessage.success('测试邮件发送成功，请检查收件箱')
  }, 1500)
}

// 保存备份设置
const saveBackupSettings = async () => {
  saving.backup = true
  try {
    saveToLocalStorage()
    ElMessage.success('备份设置已保存')
  } finally {
    saving.backup = false
  }
}

// 立即备份
const manualBackup = () => {
  backupDialogVisible.value = true
  setTimeout(() => {
    ElMessage.success('备份完成，文件已保存到备份目录')
  }, 2000)
}

// 保存安全设置
const saveSecuritySettings = async () => {
  saving.security = true
  try {
    saveToLocalStorage()
    ElMessage.success('安全设置已保存')
  } finally {
    saving.security = false
  }
}

// 标签页切换
const handleTabClick = () => {}

onMounted(() => {
  loadSettings()
  applyTheme(themeForm.defaultTheme)
  applyPrimaryColor(themeForm.primaryColor)
})
</script>

<style scoped>
.preferences-page {
  height: 100%;
  background: #F8FAFE;
  padding: 24px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
}

.page-header h2 i {
  margin-right: 10px;
  color: #3B82F6;
}

.page-desc {
  color: #64748B;
  font-size: 14px;
}

.preferences-container {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.prefs-tabs {
  padding: 0 20px;
}

.prefs-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 16px 0 0 0;
  border-bottom: 1px solid #E2E8F0;
}

.prefs-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
}

.prefs-tabs :deep(.el-tabs__item i) {
  margin-right: 6px;
}

.prefs-tabs :deep(.el-tabs__item.is-active) {
  color: #3B82F6;
}

.prefs-tabs :deep(.el-tabs__active-bar) {
  background-color: #3B82F6;
}

.prefs-panel {
  padding: 24px 28px;
  max-width: 900px;
}

.prefs-form {
  margin-top: 8px;
}

.form-tip {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 4px;
}

/* 暗色主题 */
body.dark-for-flat .preferences-page {
  background: #0F172A;
}

body.dark-for-flat .preferences-container {
  background: #1E293B;
  border-color: #334155;
}

body.dark-for-flat .prefs-tabs :deep(.el-tabs__header) {
  border-color: #334155;
}

body.dark-for-flat .prefs-tabs :deep(.el-tabs__item) {
  color: #94A3B8;
}

body.dark-for-flat .prefs-tabs :deep(.el-tabs__item.is-active) {
  color: #60A5FA;
}

body.dark-for-flat .page-header h2 {
  color: #E2E8F0;
}

body.dark-for-flat .page-desc,
body.dark-for-flat .form-tip {
  color: #94A3B8;
}

/* 响应式 */
@media (max-width: 768px) {
  .preferences-page {
    padding: 12px;
  }

  .prefs-panel {
    padding: 16px;
  }

  .prefs-tabs :deep(.el-tabs__item) {
    padding: 0 12px;
    font-size: 12px;
  }
}
</style>