<template>
  <div class="ops-dashboard">
    <!-- 科技粒子背景 -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <div class="app-layout">
      <!-- 左侧菜单栏 (可折叠) -->
      <aside :class="['sidebar', { collapsed: isCollapsed }]">
        <div class="sidebar-header">
          <div class="logo">
            <div class="logo-icon"><i class="fas fa-cloud-upload-alt"></i></div>
            <div class="logo-text">星云运维<span class="logo-badge">OPS</span></div>
          </div>
          <button class="collapse-btn" @click="toggleSidebar"><i class="fas fa-bars"></i></button>
        </div>
        <div class="nav-menu">
          <template v-for="item in menuConfig" :key="item.id">
            <!-- 有二级菜单 -->
            <div v-if="item.children" class="menu-item-wrapper has-submenu" :class="{ open: openMenus.includes(item.id) }">
              <div class="nav-item" @click="toggleSubmenu(item.id)">
                <i :class="item.icon"></i><span>{{ item.name }}</span><i class="fas fa-chevron-down"></i>
              </div>
              <ul class="submenu">
                <li v-for="child in item.children" :key="child.id" @click="openTab(child.name, child.id)">
                  {{ child.name }}
                </li>
              </ul>
            </div>
            <!-- 无二级菜单 -->
            <div v-else class="menu-item-wrapper" @click="openTab(item.name, item.id)">
              <div class="nav-item">
                <i :class="item.icon"></i><span>{{ item.name }}</span>
              </div>
            </div>
          </template>
        </div>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-detail">
              <div class="user-avatar"><i class="fas fa-user-astronaut"></i></div>
              <span class="user-name">运维工程师</span>
            </div>
            <button class="theme-toggle" @click="toggleTheme">
              <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>
          </div>
          <button class="logout-btn" @click="handleLogout"><i class="fas fa-sign-out-alt"></i><span>退出登录</span></button>
        </div>
      </aside>

      <!-- 右侧内容区 -->
      <div class="main-content">
        <div class="tabs-bar">
          <div v-for="tab in openedTabs" :key="tab.id" class="tab-item" :class="{ active: activeTabId === tab.id }" @click="activateTab(tab.id)">
            <span class="tab-title">{{ tab.title }}</span>
            <span class="close-tab" @click.stop="closeTab(tab.id)">&times;</span>
          </div>
        </div>
        <div class="content-panels">
          <!-- 动态渲染当前激活的面板 -->
          <div v-if="activePanel" class="panel">
            <component :is="activePanel" />
          </div>
          <div v-else class="empty-panel">👈 请从左侧菜单打开功能面板</div>
        </div>
        <footer class="footer-inner">
          <div class="footer-copyright">© 2025 星云运维平台 · 科技蓝</div>
          <div class="footer-links"><a href="#">系统状态</a><a href="#">文档</a></div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'

// ==================== 菜单配置 ====================
const menuConfig = ref([
  { id: 'dashboard', name: '仪表盘', icon: 'fas fa-tachometer-alt' },
  { id: 'servers', name: '服务器管理', icon: 'fas fa-server', children: [
      { id: 'server-list', name: '服务器列表' },
      { id: 'server-monitor', name: '监控详情' }
    ]},
  { id: 'alerts', name: '监控告警', icon: 'fas fa-chart-line', children: [
      { id: 'alert-rules', name: '告警规则' },
      { id: 'alert-history', name: '告警历史' }
    ]},
  { id: 'logs', name: '日志中心', icon: 'fas fa-file-alt' },
  { id: 'settings', name: '系统设置', icon: 'fas fa-cog' }
])

// ==================== 面板组件映射 (内联定义) ====================
// 仪表盘面板
const DashboardPanel = markRaw({
  name: 'DashboardPanel',
  template: `
    <div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-server"></i></div><div><div class="stat-value">128</div><div class="stat-title">服务器总数</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#06b6d4;"><i class="fas fa-microchip"></i></div><div><div class="stat-value">42%</div><div class="stat-title">平均负载</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#f59e0b;"><i class="fas fa-bell"></i></div><div><div class="stat-value">3</div><div class="stat-title">今日告警</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#10b981;"><i class="fas fa-chart-line"></i></div><div><div class="stat-value">99.98%</div><div class="stat-title">系统可用性</div></div></div>
      </div>
      <div class="chart-row">
        <div class="chart-card"><div class="card-header">系统负载趋势</div><div ref="chartDom" class="chart-container"></div></div>
        <div class="alert-card"><div class="card-header">实时告警</div><div class="alert-list"><div class="alert-item critical"><i class="fas fa-exclamation-circle"></i>CPU过高 · 2分钟前</div><div class="alert-item warning"><i class="fas fa-exclamation-triangle"></i>磁盘不足 · 15分钟前</div><div class="alert-item warning"><i class="fas fa-exclamation-triangle"></i>延迟过高 · 1小时前</div></div></div>
      </div>
      <div class="table-card"><div class="card-header">服务器状态</div><table class="server-table"><thead><tr><th>名称</th><th>IP</th><th>CPU</th><th>状态</th></tr></thead><tbody><tr><td>k8s-master-01</td><td>10.0.0.11</td><td>68%</td><td><span class="status-tag status-warning">告警</span></td></tr><tr><td>k8s-node-01</td><td>10.0.0.12</td><td>45%</td><td><span class="status-tag status-normal">正常</span></td></tr></tbody></table></div>
    </div>
  `,
  mounted() {
    const dom = this.$refs.chartDom
    if (dom) {
      const chart = echarts.init(dom)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [65, 72, 58, 82, 68, 55, 42], smooth: true, lineStyle: { color: '#3b82f6', width: 3 } }]
      })
    }
  }
})

// 服务器列表面板
const ServerListPanel = markRaw({
  name: 'ServerListPanel',
  template: `
    <div class="table-card"><div class="card-header">服务器列表 <button class="refresh-btn" @click="refresh">刷新</button></div>
    <table class="server-table"><thead><tr><th>名称</th><th>IP</th><th>CPU</th><th>内存</th><th>状态</th></tr></thead><tbody><tr v-for="s in servers" :key="s.name"><td>{{ s.name }}</td><td>{{ s.ip }}</td><td>{{ s.cpu }}%</td><td>{{ s.mem }}%</td><td><span :class="['status-tag', s.status === '正常' ? 'status-normal' : 'status-warning']">{{ s.status }}</span></td></tr></tbody></table></div>
  `,
  data() {
    return {
      servers: [
        { name: 'k8s-master-01', ip: '10.0.0.11', cpu: 68, mem: 72, status: '告警' },
        { name: 'k8s-node-01', ip: '10.0.0.12', cpu: 45, mem: 58, status: '正常' },
        { name: 'db-primary', ip: '10.0.0.21', cpu: 28, mem: 65, status: '正常' }
      ]
    }
  },
  methods: {
    refresh() {
      alert('刷新服务器列表 (演示)')
    }
  }
})

// 监控详情面板
const ServerMonitorPanel = markRaw({
  name: 'ServerMonitorPanel',
  template: `<div class="chart-card"><div class="card-header">实时监控图表</div><div ref="chartDom" style="height:300px;"></div><p style="margin-top:1rem;">CPU / 内存 实时曲线 (演示)</p></div>`,
  mounted() {
    const dom = this.$refs.chartDom
    if (dom) {
      const chart = echarts.init(dom)
      chart.setOption({
        tooltip: {},
        xAxis: { data: ['10:00', '10:05', '10:10', '10:15', '10:20'] },
        yAxis: {},
        series: [{ type: 'line', data: [32, 35, 42, 38, 45], name: 'CPU' }, { type: 'line', data: [55, 58, 62, 60, 65], name: '内存' }]
      })
    }
  }
})

// 告警规则面板
const AlertRulesPanel = markRaw({
  name: 'AlertRulesPanel',
  template: `
    <div class="stats-row"><div class="stat-card"><div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-bell"></i></div><div><div class="stat-value">12</div><div>告警规则</div></div></div><div class="stat-card"><div class="stat-icon" style="background:#f59e0b;"><i class="fas fa-exclamation-triangle"></i></div><div><div class="stat-value">3</div><div>触发中</div></div></div></div>
    <div class="table-card"><div class="card-header">规则列表</div><table class="server-table"><thead><tr><th>规则名称</th><th>条件</th><th>状态</th></tr></thead><tbody><tr><td>CPU > 85%</td><td>CPU使用率</td><td>启用</td></tr><tr><td>内存 > 90%</td><td>内存使用率</td><td>启用</td></tr></tbody></table></div>
  `
})

// 告警历史面板
const AlertHistoryPanel = markRaw({
  name: 'AlertHistoryPanel',
  template: `<div class="alert-list"><div class="alert-item"><i class="fas fa-circle"></i> CPU告警 2025-04-30 10:23</div><div class="alert-item"><i class="fas fa-circle"></i> 磁盘告警 2025-04-30 09:15</div><div class="alert-item"><i class="fas fa-circle"></i> API延迟告警 2025-04-29 22:00</div></div>`
})

// 日志中心面板
const LogsPanel = markRaw({
  name: 'LogsPanel',
  template: `<div class="table-card"><div class="card-header">系统日志</div><pre style="background:var(--bg-soft); padding:1rem; border-radius:0.5rem;">2025-04-30 14:23:45 INFO 服务启动成功\n2025-04-30 14:20:12 WARN  API响应延迟\n2025-04-30 14:15:03 ERROR 数据库连接超时(已恢复)</pre></div>`
})

// 系统设置面板
const SettingsPanel = markRaw({
  name: 'SettingsPanel',
  template: `<div class="stats-row"><div class="stat-card"><i class="fas fa-user-shield"></i> 个人设置</div><div class="stat-card"><i class="fas fa-bell"></i> 通知偏好</div></div><div><button class="refresh-btn" @click="save">保存设置(演示)</button></div>`,
  methods: { save() { alert('保存设置 (演示)') } }
})

const panelMap = {
  'dashboard': DashboardPanel,
  'server-list': ServerListPanel,
  'server-monitor': ServerMonitorPanel,
  'alert-rules': AlertRulesPanel,
  'alert-history': AlertHistoryPanel,
  'logs': LogsPanel,
  'settings': SettingsPanel
}

// ==================== 标签页状态 ====================
const openedTabs = ref([])
const activeTabId = ref(null)
const activePanel = ref(null)
let nextId = 1

const openTab = (title, panelId) => {
  const existing = openedTabs.value.find(t => t.panelId === panelId)
  if (existing) {
    activeTabId.value = existing.id
    activePanel.value = existing.panelComponent
    return
  }
  const panelComponent = panelMap[panelId]
  if (!panelComponent) return
  const newTab = { id: nextId++, title, panelId, panelComponent }
  openedTabs.value.push(newTab)
  activeTabId.value = newTab.id
  activePanel.value = panelComponent
}

const activateTab = (id) => {
  const tab = openedTabs.value.find(t => t.id === id)
  if (tab) {
    activeTabId.value = id
    activePanel.value = tab.panelComponent
  }
}

const closeTab = (id) => {
  const idx = openedTabs.value.findIndex(t => t.id === id)
  if (idx !== -1) openedTabs.value.splice(idx, 1)
  if (openedTabs.value.length === 0) {
    activeTabId.value = null
    activePanel.value = null
  } else if (activeTabId.value === id) {
    const last = openedTabs.value[openedTabs.value.length - 1]
    activeTabId.value = last.id
    activePanel.value = last.panelComponent
  }
}

// ==================== 侧边栏折叠 ====================
const isCollapsed = ref(false)
const openMenus = ref([])

const toggleSidebar = () => { isCollapsed.value = !isCollapsed.value }
const toggleSubmenu = (id) => {
  const idx = openMenus.value.indexOf(id)
  idx === -1 ? openMenus.value.push(id) : openMenus.value.splice(idx, 1)
}

// ==================== 主题切换 ====================
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
  localStorage.setItem('ops-theme', isDark.value ? 'dark' : 'light')
}

const handleLogout = () => alert('已退出登录 (演示)')

// ==================== 粒子背景 ====================
const particleCanvas = ref(null)
let animationId = null
let particles = []
let width = 0, height = 0

const initParticles = () => {
  particles = []
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * width, y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.12
    })
  }
}

const drawParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
    ctx.fill()
    p.x += p.speedX; p.y += p.speedY
    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0
  }
  animationId = requestAnimationFrame(drawParticles)
}

const resizeCanvas = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
  initParticles()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('ops-theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.body.classList.add('dark')
  }
  resizeCanvas()
  drawParticles()
  window.addEventListener('resize', resizeCanvas)
  // 默认打开仪表盘面板
  openTab('仪表盘', 'dashboard')
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
/* 全局样式与主题变量 */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: linear-gradient(145deg, #f0f7ff 0%, #eef4fe 100%);
  color: #1a2c3e;
  transition: background 0.3s, color 0.2s;
  min-height: 100vh;
  overflow-x: hidden;
}

body.dark {
  background: #0a0f1a;
  color: #eef5ff;
}

.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 2px 2px, rgba(59,130,246,0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 2;
}

/* 侧边栏样式 */
.sidebar {
  width: 260px;
  background: rgba(18, 30, 45, 0.85);
  backdrop-filter: blur(16px);
  border-right: 1px solid rgba(59,130,246,0.25);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
body.dark .sidebar { background: rgba(10, 15, 26, 0.9); }
.sidebar.collapsed { width: 80px; }
.sidebar.collapsed .logo-text,
.sidebar.collapsed .nav-item span,
.sidebar.collapsed .submenu,
.sidebar.collapsed .user-name,
.sidebar.collapsed .logout-btn span { display: none; }
.sidebar.collapsed .nav-item { justify-content: center; padding: 0.7rem 0; }

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(59,130,246,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo { display: flex; align-items: center; gap: 0.6rem; }
.logo-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(145deg, #3b82f6, #1e3a8a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon i { font-size: 1.3rem; color: white; }
.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, #60a5fa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.collapse-btn {
  background: rgba(59,130,246,0.15);
  border: none;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #60a5fa;
}
.nav-menu { flex: 1; padding: 1rem 0.8rem; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  border-radius: 0.8rem;
  color: #9ab3d5;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}
.nav-item:hover { background: rgba(59,130,246,0.15); color: #3b82f6; }
.nav-item i { width: 1.4rem; }
.submenu {
  margin-left: 2.2rem;
  list-style: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.has-submenu.open .submenu { max-height: 300px; }
.submenu li {
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  font-size: 0.8rem;
  color: #9ab3d5;
  cursor: pointer;
}
.submenu li:hover { background: rgba(59,130,246,0.2); color: #3b82f6; }

.sidebar-footer { padding: 1rem; border-top: 1px solid rgba(59,130,246,0.15); }
.user-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
.user-detail { display: flex; align-items: center; gap: 0.5rem; }
.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(145deg, #3b82f6, #1e3a8a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-avatar i { font-size: 1rem; color: white; }
.theme-toggle, .logout-btn {
  background: rgba(59,130,246,0.1);
  border: none;
  border-radius: 40px;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: #3b82f6;
}
.logout-btn {
  width: 100%;
  background: rgba(239,68,68,0.15);
  border: 1px solid rgba(239,68,68,0.3);
  color: #ef4444;
  gap: 0.5rem;
  font-size: 0.75rem;
  padding: 0.5rem;
}

/* 右侧内容区 */
.main-content { flex: 1; display: flex; flex-direction: column; overflow-x: auto; }
.tabs-bar {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(59,130,246,0.15);
  padding: 0.5rem 1rem;
  display: flex;
  gap: 0.3rem;
  position: sticky;
  top: 0;
  z-index: 10;
}
body.dark .tabs-bar { background: rgba(17,25,39,0.85); }
.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(59,130,246,0.08);
  border-radius: 2rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: #6c8eae;
}
.tab-item.active { background: #3b82f6; color: white; }
.close-tab { margin-left: 0.3rem; font-size: 0.7rem; opacity: 0.7; cursor: pointer; }
.content-panels { flex: 1; padding: 1.5rem; }
.empty-panel { text-align: center; padding: 3rem; color: #6c8eae; }
.footer-inner { display: flex; justify-content: space-between; padding: 1rem 1.5rem; border-top: 1px solid rgba(59,130,246,0.15); }
.footer-links a { margin-left: 1rem; color: #6c8eae; text-decoration: none; font-size: 0.75rem; }

/* 卡片样式 */
.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.stat-card { background: var(--bg-card, white); border-radius: 1rem; border: 1px solid rgba(59,130,246,0.15); padding: 1rem; display: flex; align-items: center; gap: 1rem; }
body.dark .stat-card { background: #131e2c; }
.stat-icon { width: 48px; height: 48px; border-radius: 1rem; display: flex; align-items: center; justify-content: center; }
.stat-value { font-size: 1.5rem; font-weight: 700; }
.stat-title { font-size: 0.75rem; color: #6c8eae; }
.chart-row { display: grid; grid-template-columns: 1fr 0.8fr; gap: 1rem; margin-bottom: 1.5rem; }
.chart-card, .alert-card, .table-card { background: var(--bg-card, white); border-radius: 1rem; border: 1px solid rgba(59,130,246,0.15); overflow: hidden; }
.card-header { padding: 0.8rem 1rem; border-bottom: 1px solid rgba(59,130,246,0.1); font-weight: 600; }
.chart-container { height: 280px; width: 100%; }
.alert-list { padding: 0.5rem; }
.alert-item { display: flex; gap: 0.8rem; padding: 0.7rem; border-bottom: 1px solid rgba(59,130,246,0.1); }
.alert-item.critical .alert-icon { color: #ef4444; }
.server-table { width: 100%; border-collapse: collapse; }
.server-table th, .server-table td { padding: 0.7rem 0.8rem; text-align: left; border-bottom: 1px solid rgba(59,130,246,0.1); }
.status-tag { padding: 0.2rem 0.5rem; border-radius: 30px; font-size: 0.65rem; }
.status-normal { background: rgba(16,185,129,0.15); color: #10b981; }
.status-warning { background: rgba(245,158,11,0.15); color: #f59e0b; }
.refresh-btn { background: #3b82f6; border: none; padding: 0.3rem 0.8rem; border-radius: 2rem; color: white; font-size: 0.7rem; cursor: pointer; }

@media (max-width: 768px) {
  .sidebar { position: fixed; left: -260px; z-index: 200; }
  .sidebar.collapsed { left: 0; width: 80px; }
  .chart-row { grid-template-columns: 1fr; }
}
</style>