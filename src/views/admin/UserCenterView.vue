<template>
  <div class="profile-page">
    <!-- 顶部个人资料卡 -->
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar-wrapper" @mouseenter="showAvatarOverlay = true" @mouseleave="showAvatarOverlay = false">
          <img :src="userInfo.avatar || defaultAvatar" class="avatar" alt="头像" />
          <div class="avatar-overlay" v-show="showAvatarOverlay">
            <el-upload
                class="avatar-upload"
                action="#"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="handleAvatarUpload"
            >
              <i class="fas fa-camera"></i>
              <span>更换头像</span>
            </el-upload>
          </div>
        </div>
        <div class="user-info">
          <h2 class="username">{{ userInfo.nickname || userInfo.username }}</h2>
          <p class="user-role">
            <el-tag :type="userInfo.role === 'admin' ? 'danger' : 'primary'" size="small">
              {{ userInfo.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </p>
          <p class="user-bio">{{ userInfo.bio || '这个人很懒，什么都没写...' }}</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon" style="background: #EFF6FF;">
            <i class="fas fa-file-alt" style="color: #3B82F6;"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ userInfo.postCount || 0 }}</div>
            <div class="stat-label">文章数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #ECFDF5;">
            <i class="fas fa-comments" style="color: #10B981;"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ userInfo.commentCount || 0 }}</div>
            <div class="stat-label">评论数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #FEF3C7;">
            <i class="fas fa-eye" style="color: #F59E0B;"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ userInfo.viewCount || 0 }}</div>
            <div class="stat-label">总阅读</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #FEE2E2;">
            <i class="fas fa-calendar-alt" style="color: #EF4444;"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ memberSince }}</div>
            <div class="stat-label">加入天数</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="profile-main">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="个人资料" name="basic">
          <div class="basic-info">
            <el-form :model="formData" :rules="formRules" ref="formRef" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="formData.nickname" placeholder="请输入昵称" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入手机号" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="所在地" prop="location">
                    <el-input v-model="formData.location" placeholder="请输入所在地" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="个人网站" prop="website">
                    <el-input v-model="formData.website" placeholder="https://example.com" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="个人简介" prop="bio">
                <el-input
                    v-model="formData.bio"
                    type="textarea"
                    :rows="4"
                    placeholder="介绍一下自己..."
                    maxlength="200"
                    show-word-limit
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveProfile" :loading="saving">
                  <i class="fas fa-save"></i> 保存修改
                </el-button>
                <el-button @click="resetForm">
                  <i class="fas fa-undo"></i> 重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="联系方式" name="contact">
          <div class="contact-info">
            <el-form :model="contactForm" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model="contactForm.email" placeholder="请输入邮箱" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号">
                    <el-input v-model="contactForm.phone" placeholder="请输入手机号" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="QQ">
                    <el-input v-model="contactForm.qq" placeholder="请输入QQ号" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="微信">
                    <el-input v-model="contactForm.wechat" placeholder="请输入微信号" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="saveContact" :loading="savingContact">
                  <i class="fas fa-save"></i> 保存联系方式
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="社交账号" name="social">
          <div class="social-info">
            <el-form :model="socialForm" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="GitHub">
                    <el-input v-model="socialForm.github" placeholder="https://github.com/username" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="微博">
                    <el-input v-model="socialForm.weibo" placeholder="https://weibo.com/username" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Twitter">
                    <el-input v-model="socialForm.twitter" placeholder="https://twitter.com/username" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="知乎">
                    <el-input v-model="socialForm.zhihu" placeholder="https://zhihu.com/people/username" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="saveSocial" :loading="savingSocial">
                  <i class="fas fa-save"></i> 保存社交账号
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="修改密码" name="password">
          <div class="password-info">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
              <el-form-item label="当前密码" prop="oldPassword">
                <el-input
                    v-model="passwordForm.oldPassword"
                    type="password"
                    placeholder="请输入当前密码"
                    show-password
                    style="max-width: 400px"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="请输入新密码（6-20位）"
                    show-password
                    style="max-width: 400px"
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    show-password
                    style="max-width: 400px"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePassword" :loading="changingPwd">
                  <i class="fas fa-key"></i> 修改密码
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="偏好设置" name="preferences">
          <div class="preferences-info">
            <el-form label-width="120px">
              <el-form-item label="主题模式">
                <el-radio-group v-model="preferences.theme">
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
              <el-form-item label="语言">
                <el-select v-model="preferences.language" style="width: 200px">
                  <el-option label="简体中文" value="zh-CN" />
                  <el-option label="English" value="en-US" />
                  <el-option label="日本語" value="ja-JP" />
                </el-select>
              </el-form-item>
              <el-form-item label="文章列表样式">
                <el-radio-group v-model="preferences.listStyle">
                  <el-radio-button label="card">
                    <i class="fas fa-th-large"></i> 卡片
                  </el-radio-button>
                  <el-radio-button label="list">
                    <i class="fas fa-list"></i> 列表
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="通知设置">
                <el-checkbox v-model="preferences.emailNotify">邮件通知</el-checkbox>
                <el-checkbox v-model="preferences.commentNotify">评论提醒</el-checkbox>
                <el-checkbox v-model="preferences.systemNotify">系统消息</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="savePreferences">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 默认头像
const defaultAvatar = 'https://picsum.photos/id/100/200/200'

// 用户信息
const userInfo = ref({
  id: 1,
  username: 'admin',
  nickname: '运维管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  qq: '',
  wechat: '',
  location: '中国 · 杭州',
  website: 'https://blog.example.com',
  bio: '热爱技术，热爱生活。全栈开发者，专注于前端和运维领域。',
  avatar: '',
  role: 'admin',
  postCount: 42,
  commentCount: 156,
  viewCount: 28476,
  github: 'https://github.com/admin',
  weibo: '',
  twitter: '',
  zhihu: '',
  createdAt: '2024-01-15T08:00:00Z'
})

// 显示头像遮罩
const showAvatarOverlay = ref(false)

// 加载状态
const saving = ref(false)
const savingContact = ref(false)
const changingPwd = ref(false)
const savingSocial = ref(false)

// 当前激活的标签页
const activeTab = ref('basic')

// 表单引用
const formRef = ref(null)
const passwordFormRef = ref(null)

// 计算加入天数
const memberSince = computed(() => {
  const joinDate = new Date(userInfo.value.createdAt)
  const today = new Date()
  const days = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24))
  return days
})

// 表单数据
const formData = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  bio: ''
})

// 联系方式表单
const contactForm = reactive({
  email: '',
  phone: '',
  qq: '',
  wechat: ''
})

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 社交表单
const socialForm = reactive({
  github: '',
  weibo: '',
  twitter: '',
  zhihu: ''
})

// 偏好设置
const preferences = reactive({
  theme: 'light',
  language: 'zh-CN',
  listStyle: 'card',
  emailNotify: true,
  commentNotify: true,
  systemNotify: false
})

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  website: [
    { pattern: /^https?:\/\/.+/, message: '请输入正确的网址格式（以 http:// 或 https:// 开头）', trigger: 'blur' }
  ]
}

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 加载用户数据
const loadUserData = () => {
  const stored = localStorage.getItem('user_profile')
  if (stored) {
    const data = JSON.parse(stored)
    userInfo.value = { ...userInfo.value, ...data }
  }

  // 同步到表单
  formData.username = userInfo.value.username
  formData.nickname = userInfo.value.nickname || userInfo.value.username
  formData.email = userInfo.value.email || ''
  formData.phone = userInfo.value.phone || ''
  formData.location = userInfo.value.location || ''
  formData.website = userInfo.value.website || ''
  formData.bio = userInfo.value.bio || ''

  contactForm.email = userInfo.value.email || ''
  contactForm.phone = userInfo.value.phone || ''
  contactForm.qq = userInfo.value.qq || ''
  contactForm.wechat = userInfo.value.wechat || ''

  socialForm.github = userInfo.value.github || ''
  socialForm.weibo = userInfo.value.weibo || ''
  socialForm.twitter = userInfo.value.twitter || ''
  socialForm.zhihu = userInfo.value.zhihu || ''

  // 加载偏好设置
  const storedPrefs = localStorage.getItem('user_preferences')
  if (storedPrefs) {
    Object.assign(preferences, JSON.parse(storedPrefs))
  }
  applyTheme(preferences.theme)
}

// 保存用户数据
const saveUserData = () => {
  localStorage.setItem('user_profile', JSON.stringify(userInfo.value))
}

// 保存偏好设置
const savePreferencesData = () => {
  localStorage.setItem('user_preferences', JSON.stringify(preferences))
  applyTheme(preferences.theme)
}

// 应用主题
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

// 保存个人资料
const saveProfile = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    saving.value = true
    try {
      userInfo.value = {
        ...userInfo.value,
        username: formData.username,
        nickname: formData.nickname,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        bio: formData.bio
      }
      // 同步联系方式
      contactForm.email = formData.email
      contactForm.phone = formData.phone
      userInfo.value.email = formData.email
      userInfo.value.phone = formData.phone

      saveUserData()
      ElMessage.success('个人资料已保存')
    } catch (error) {
      ElMessage.error('保存失败')
    } finally {
      saving.value = false
    }
  })
}

// 重置表单
const resetForm = () => {
  formData.username = userInfo.value.username
  formData.nickname = userInfo.value.nickname || userInfo.value.username
  formData.email = userInfo.value.email || ''
  formData.phone = userInfo.value.phone || ''
  formData.location = userInfo.value.location || ''
  formData.website = userInfo.value.website || ''
  formData.bio = userInfo.value.bio || ''
  ElMessage.info('已重置')
}

// 保存联系方式
const saveContact = () => {
  savingContact.value = true
  try {
    userInfo.value = {
      ...userInfo.value,
      email: contactForm.email,
      phone: contactForm.phone,
      qq: contactForm.qq,
      wechat: contactForm.wechat
    }
    // 同步个人资料表单
    formData.email = contactForm.email
    formData.phone = contactForm.phone
    saveUserData()
    ElMessage.success('联系方式已保存')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    savingContact.value = false
  }
}

// 修改密码
const changePassword = async () => {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (!valid) return

    changingPwd.value = true
    try {
      // 模拟验证旧密码
      if (passwordForm.oldPassword !== 'admin123') {
        ElMessage.error('当前密码错误')
        return
      }

      // 保存新密码（实际项目中应调用后端API）
      ElMessage.success('密码修改成功，请重新登录')

      // 清空表单
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } catch (error) {
      ElMessage.error('修改失败')
    } finally {
      changingPwd.value = false
    }
  })
}

// 保存社交账号
const saveSocial = () => {
  savingSocial.value = true
  try {
    userInfo.value = {
      ...userInfo.value,
      github: socialForm.github,
      weibo: socialForm.weibo,
      twitter: socialForm.twitter,
      zhihu: socialForm.zhihu
    }
    saveUserData()
    ElMessage.success('社交账号已保存')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    savingSocial.value = false
  }
}

// 保存偏好设置
const savePreferences = () => {
  savePreferencesData()
  ElMessage.success('偏好设置已保存')
}

// 头像上传前验证
const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

// 处理头像上传
const handleAvatarUpload = (options) => {
  const file = options.file
  const reader = new FileReader()

  reader.onload = (e) => {
    userInfo.value.avatar = e.target.result
    saveUserData()
    ElMessage.success('头像更新成功')
  }

  reader.readAsDataURL(file)
}

// 监听系统主题变化
const setupThemeListener = () => {
  if (preferences.theme === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (preferences.theme === 'auto') {
        document.body.classList.toggle('dark', e.matches)
      }
    })
  }
}

onMounted(() => {
  loadUserData()
  setupThemeListener()
})
</script>

<style scoped>
.profile-page {
  height: 100%;
  background: var(--admin-bg-page);
  padding: 24px;
  overflow-y: auto;
}

/* 顶部个人资料卡 */
.profile-header {
  background: var(--admin-bg-card);
  border-radius: 20px;
  border: 1px solid var(--admin-border);
  padding: 24px;
  margin-bottom: 24px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--admin-border);
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: white;
}

.avatar-upload i {
  font-size: 24px;
}

.avatar-upload span {
  font-size: 12px;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 24px;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: 8px;
}

.user-role {
  margin-bottom: 8px;
}

.user-bio {
  font-size: 14px;
  color: var(--admin-text-muted);
  line-height: 1.5;
}

/* 统计卡片行 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--admin-bg-card-alt);
  border-radius: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 22px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--admin-text);
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: var(--admin-text-muted);
  margin-top: 4px;
}

/* 编辑区域 */
.profile-main {
  background: var(--admin-bg-card);
  border-radius: 20px;
  border: 1px solid var(--admin-border);
  padding: 24px;
}

/* 表单样式 */
.basic-info, .contact-info, .social-info, .password-info, .preferences-info {
  padding: 8px 0;
}

/* 响应式 */
@media (max-width: 900px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 16px;
  }

  .avatar-section {
    flex-direction: column;
    text-align: center;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .profile-header, .profile-main {
    padding: 16px;
  }
}
</style>