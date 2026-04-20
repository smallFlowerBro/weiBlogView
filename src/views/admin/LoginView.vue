<template>
  <div class="login-container">
    <!-- 科技蓝粒子背景 Canvas -->
    <canvas ref="canvasRef" class="particle-canvas"></canvas>

    <!-- 主卡片 - 左右融合布局 -->
    <div class="glass-card">
      <!-- 左侧：插画区域 -->
      <div class="illustration-panel">
        <div class="illustration">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#1e3a8a" />
              </linearGradient>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#3b82f6" />
              </linearGradient>
              <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#93c5fd" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feMerge>
                  <feMergeNode in="offsetblur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- 科技环背景 -->
            <circle cx="200" cy="140" r="110" stroke="url(#blueGrad)" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="6 6" />
            <circle cx="200" cy="140" r="85" stroke="url(#cyanGrad)" stroke-width="1" fill="none" opacity="0.25" stroke-dasharray="4 8" />

            <!-- 羽毛笔主体 -->
            <g filter="url(#glow)">
              <path d="M170 170 L215 125 L240 150 L195 195 L170 170Z" fill="url(#blueGrad)" opacity="0.9" />
              <path d="M215 125 L255 80 L245 60 L205 100 L215 125Z" fill="url(#cyanGrad)" opacity="0.85" />
              <path d="M255 80 L267 62 L260 55 L248 72 L255 80Z" fill="#60a5fa" />
            </g>

            <!-- 书写轨迹 -->
            <path d="M160 190 Q185 215 210 200 Q235 185 260 200 Q280 210 300 200" stroke="url(#lightGrad)" stroke-width="2" fill="none" stroke-dasharray="5 3" opacity="0.8" />
            <path d="M150 205 Q175 230 200 215" stroke="#3b82f6" stroke-width="1.5" fill="none" opacity="0.6" />

            <!-- 数据光点动画 -->
            <circle cx="120" cy="90" r="3" fill="#60a5fa" opacity="0.9">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="310" cy="70" r="2.5" fill="#3b82f6" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="330" cy="140" r="2" fill="#06b6d4" opacity="0.7">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="160" r="2" fill="#60a5fa" opacity="0.6" />
            <circle cx="280" cy="250" r="1.5" fill="#3b82f6" opacity="0.5" />

            <!-- 底部数据流 -->
            <rect x="130" y="245" width="140" height="6" rx="3" fill="url(#blueGrad)" opacity="0.2" />
            <rect x="150" y="258" width="100" height="4" rx="2" fill="url(#cyanGrad)" opacity="0.15" />
          </svg>
        </div>
        <div class="tagline">
          <h3>墨客 · 创作空间</h3>
          <p>书写，是思想的呼吸</p>
        </div>
      </div>

      <!-- 右侧：登录表单 -->
      <div class="login-panel">
        <div class="login-card">
          <div class="login-header">
            <div class="login-avatar">
              <i class="fas fa-feather-alt"></i>
            </div>
            <h2>作者登录</h2>
            <p>进入你的创作后台</p>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <label>邮箱 / 用户名</label>
              <div class="input-field" :class="{ error: errors.username }">
                <i class="fas fa-envelope"></i>
                <input type="text" v-model="form.username" placeholder="your@email.com" />
              </div>
              <div class="error-message" v-if="errors.username">{{ errors.username }}</div>
            </div>

            <div class="input-group">
              <label>密码</label>
              <div class="input-field" :class="{ error: errors.password }">
                <i class="fas fa-lock"></i>
                <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="请输入密码" />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                </button>
              </div>
              <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="extra-options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe" /> 记住登录
              </label>
              <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">忘记密码?</a>
            </div>

            <button type="submit" class="login-btn" :disabled="loading">
              <i class="fas fa-arrow-right-to-bracket"></i> {{ loading ? '登录中...' : '进入后台' }}
            </button>
          </form>

          <div class="divider"><span>其他登录方式</span></div>
          <div class="oauth-buttons">
            <button class="oauth-btn" @click="handleGithubLogin"><i class="fab fa-github"></i> GitHub</button>
            <button class="oauth-btn" @click="handleGoogleLogin"><i class="fab fa-google"></i> Google</button>
          </div>
          <div class="footer-note">
            <i class="fas fa-shield-alt"></i> 安全环境 · 创作数据自动备份
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 表单数据
const form = reactive({
  username: 'writer@lightvue.com',
  password: ''
})

const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

// 错误信息
const errors = reactive({
  username: '',
  password: ''
})

// 粒子画布引用
const canvasRef = ref(null)
let animationId = null
let particles = []
let width = 0
let height = 0

// 表单验证
const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''

  if (!form.username.trim()) {
    errors.username = '请输入邮箱或用户名'
    isValid = false
  }

  if (!form.password.trim()) {
    errors.password = '请输入密码'
    isValid = false
  }

  return isValid
}

// 登录提交
const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false

  // 保存记住密码
  if (rememberMe.value) {
    localStorage.setItem('writer_user', form.username.trim())
    localStorage.setItem('writer_remember', 'true')
  } else {
    localStorage.removeItem('writer_user')
    localStorage.setItem('writer_remember', 'false')
  }

  showToast('✅ 登录成功，欢迎回来 (演示模式)')
  // 实际跳转: router.push('/dashboard')
}

// 忘记密码
const handleForgotPassword = () => {
  showToast('📧 重置链接已发送至您的邮箱 (演示)')
}

// 第三方登录
const handleGithubLogin = () => {
  showToast('🐙 GitHub 授权登录 (演示)')
}

const handleGoogleLogin = () => {
  showToast('🔐 Google 账号登录 (演示)')
}

// Toast 提示
const showToast = (msg) => {
  const toast = document.createElement('div')
  toast.className = 'custom-toast'
  toast.textContent = msg
  toast.style.position = 'fixed'
  toast.style.bottom = '28px'
  toast.style.left = '50%'
  toast.style.transform = 'translateX(-50%)'
  toast.style.backgroundColor = '#3b82f6'
  toast.style.color = 'white'
  toast.style.padding = '10px 24px'
  toast.style.borderRadius = '40px'
  toast.style.fontSize = '0.85rem'
  toast.style.fontWeight = '500'
  toast.style.zIndex = '9999'
  toast.style.boxShadow = '0 8px 20px rgba(59,130,246,0.4)'
  toast.style.backdropFilter = 'blur(8px)'
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2500)
}

// 加载记住的凭证
const loadCredentials = () => {
  if (localStorage.getItem('writer_remember') === 'true') {
    form.username = localStorage.getItem('writer_user') || ''
    rememberMe.value = true
  }
}

// ========== 粒子背景动画 ==========
const initParticles = () => {
  particles = []
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.15
    })
  }
}

const drawParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
    ctx.fill()
    p.x += p.speedX
    p.y += p.speedY
    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0
  }
  animationId = requestAnimationFrame(drawParticles)
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
  initParticles()
}

// 生命周期
onMounted(() => {
  loadCredentials()
  resizeCanvas()
  drawParticles()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(145deg, #0a1928 0%, #0a2a3a 100%);
  font-family: 'Inter', 'JetBrains Mono', monospace;
}

/* 粒子画布 */
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
}

/* 网格背景 */
.login-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
  linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

/* 主卡片 */
.glass-card {
  display: flex;
  max-width: 1100px;
  width: 100%;
  background: rgba(18, 30, 45, 0.55);
  backdrop-filter: blur(16px);
  border-radius: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.35);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1) inset;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.glass-card:hover {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.4);
}

/* 左侧插画区域 */
.illustration-panel {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.05) 100%);
}

.illustration {
  margin-bottom: 2rem;
}

.illustration svg {
  width: 100%;
  height: auto;
  max-width: 380px;
  filter: drop-shadow(0 8px 20px rgba(59, 130, 246, 0.3));
}

.tagline {
  text-align: center;
}

.tagline h3 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #60a5fa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.tagline p {
  color: #9ab3d5;
  font-size: 0.85rem;
}

/* 右侧表单区域 */
.login-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
}

.login-card {
  width: 100%;
  max-width: 380px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #3b82f6, #1e3a8a);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
}

.login-avatar i {
  font-size: 2rem;
  color: white;
}

.login-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #60a5fa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.login-header p {
  font-size: 0.85rem;
  color: #9ab3d5;
  margin-top: 0.3rem;
}

/* 表单样式 */
.input-group {
  margin-bottom: 1.2rem;
}

.input-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ab3d5;
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
}

.input-field {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field i {
  position: absolute;
  left: 1rem;
  color: #3b82f6;
  font-size: 1rem;
}

.input-field input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.8rem;
  background: rgba(10, 20, 30, 0.7);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #eef5ff;
  font-family: inherit;
  transition: all 0.2s;
  outline: none;
}

.input-field input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  background: rgba(10, 20, 30, 0.9);
}

.input-field input::placeholder {
  color: #5b7a9a;
}

.input-field.error input {
  border-color: #f87171;
  animation: shake 0.3s;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  font-size: 1rem;
}

.error-message {
  font-size: 0.7rem;
  color: #f87171;
  margin-top: 0.3rem;
  padding-left: 0.5rem;
}

.extra-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.2rem 0 1.8rem;
  font-size: 0.8rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ab3d5;
  cursor: pointer;
}

.remember-me input {
  accent-color: #3b82f6;
  width: 16px;
  height: 16px;
}

.forgot-link {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
}

.forgot-link:hover {
  color: #3b82f6;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #1e3a8a);
  border: none;
  padding: 0.9rem;
  border-radius: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  transition: all 0.25s;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.3);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.5);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
}

.divider span {
  background: transparent;
  padding: 0 1rem;
  font-size: 0.75rem;
  color: #7e95b0;
  position: relative;
}

.oauth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.oauth-btn {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 2rem;
  padding: 0.6rem 1.2rem;
  color: #cbd5e1;
  font-size: 0.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.oauth-btn:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: #3b82f6;
  color: #fff;
  transform: translateY(-2px);
}

.footer-note {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.7rem;
  color: #5b7a9a;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* 响应式 */
@media (max-width: 900px) {
  .glass-card {
    flex-direction: column;
    max-width: 480px;
  }
  .illustration-panel {
    padding: 2rem;
  }
  .illustration svg {
    max-width: 260px;
  }
  .tagline h3 {
    font-size: 1.2rem;
  }
  .login-panel {
    padding: 2rem;
  }
}

@media (max-width: 500px) {
  .illustration-panel {
    display: none;
  }
  .login-panel {
    padding: 1.8rem;
  }
}
</style>