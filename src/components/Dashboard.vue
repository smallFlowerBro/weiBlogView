<template>
  <div class="fade-in">
    <!-- 第一行：核心数据卡片（4个等宽） -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background: #EFF6FF;">
          <i class="fas fa-file-alt" style="color: #3B82F6;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalPosts }}</div>
          <div class="stat-label">总文章</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #ECFDF5;">
          <i class="fas fa-comments" style="color: #10B981;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalComments }}</div>
          <div class="stat-label">评论总量</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #FEF3C7;">
          <i class="fas fa-clock" style="color: #F59E0B;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ pendingComments }}</div>
          <div class="stat-label">待审评论</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #FEE2E2;">
          <i class="fas fa-chart-line" style="color: #EF4444;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">1,284</div>
          <div class="stat-label">周访问量</div>
        </div>
      </div>
    </div>

    <!-- 第二行：服务器硬件监控（3个等宽核心指标） -->
    <div class="section-title">
      <i class="fas fa-server"></i>
      <span>服务器状态</span>
      <el-button size="small" text @click="refreshHardwareInfo" :loading="hardwareLoading" class="refresh-btn">
        <i class="fas fa-sync-alt"></i> 刷新
      </el-button>
    </div>
    <div class="monitor-row">
      <div class="monitor-card">
        <div class="monitor-header">
          <div class="monitor-icon cpu-icon">
            <i class="fas fa-microchip"></i>
          </div>
          <div class="monitor-title">CPU 使用率</div>
        </div>
        <div class="monitor-value">
          <span class="value-number">{{ cpuInfo.usage }}</span>
          <span class="value-unit">%</span>
        </div>
        <el-progress
            :percentage="cpuInfo.usage"
            :color="getProgressColor(cpuInfo.usage)"
            :stroke-width="10"
            :show-text="false"
        />
        <div class="monitor-footer">
          <span><i class="fas fa-microchip"></i> {{ cpuInfo.cores }} 核心</span>
          <span><i class="fas fa-tachometer-alt"></i> {{ cpuInfo.speed }}</span>
        </div>
      </div>

      <div class="monitor-card">
        <div class="monitor-header">
          <div class="monitor-icon memory-icon">
            <i class="fas fa-memory"></i>
          </div>
          <div class="monitor-title">内存使用</div>
        </div>
        <div class="monitor-value">
          <span class="value-number">{{ memoryInfo.used }}</span>
          <span class="value-unit">/ {{ memoryInfo.total }}</span>
        </div>
        <el-progress
            :percentage="memoryInfo.percent"
            :color="getProgressColor(memoryInfo.percent)"
            :stroke-width="10"
            :show-text="false"
        />
        <div class="monitor-footer">
          <span><i class="fas fa-database"></i> 已用 {{ memoryInfo.used }}</span>
          <span><i class="fas fa-archive"></i> 空闲 {{ memoryInfo.free }}</span>
        </div>
      </div>

      <div class="monitor-card">
        <div class="monitor-header">
          <div class="monitor-icon disk-icon">
            <i class="fas fa-hdd"></i>
          </div>
          <div class="monitor-title">磁盘使用</div>
        </div>
        <div class="monitor-value">
          <span class="value-number">{{ diskInfo.used }}</span>
          <span class="value-unit">/ {{ diskInfo.total }}</span>
        </div>
        <el-progress
            :percentage="diskInfo.percent"
            :color="getProgressColor(diskInfo.percent)"
            :stroke-width="10"
            :show-text="false"
        />
        <div class="monitor-footer">
          <span><i class="fas fa-database"></i> 已用 {{ diskInfo.used }}</span>
          <span><i class="fas fa-archive"></i> 可用 {{ diskInfo.free }}</span>
        </div>
      </div>
    </div>

    <!-- 第三行：系统负载 + 网络信息 + 服务状态（3个等宽） -->
    <div class="info-row">
      <div class="info-card">
        <div class="info-header">
          <i class="fas fa-chart-line"></i>
          <span>系统负载</span>
        </div>
        <div class="load-container">
          <div class="load-item">
            <span class="load-label">1分钟</span>
            <span class="load-value" :class="getLoadClass(loadInfo.load1)">{{ loadInfo.load1 }}</span>
          </div>
          <div class="load-item">
            <span class="load-label">5分钟</span>
            <span class="load-value" :class="getLoadClass(loadInfo.load5)">{{ loadInfo.load5 }}</span>
          </div>
          <div class="load-item">
            <span class="load-label">15分钟</span>
            <span class="load-value" :class="getLoadClass(loadInfo.load15)">{{ loadInfo.load15 }}</span>
          </div>
        </div>
        <div class="info-footer">
          <span><i class="fas fa-clock"></i> 运行时间: {{ uptimeInfo }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-header">
          <i class="fas fa-network-wired"></i>
          <span>网络流量</span>
        </div>
        <div class="network-container">
          <div class="network-item">
            <div class="network-direction down">
              <i class="fas fa-arrow-down"></i> 下载
            </div>
            <div class="network-speed">{{ networkInfo.download }}</div>
          </div>
          <div class="network-item">
            <div class="network-direction up">
              <i class="fas fa-arrow-up"></i> 上传
            </div>
            <div class="network-speed">{{ networkInfo.upload }}</div>
          </div>
        </div>
        <div class="info-footer">
          <span><i class="fas fa-plug"></i> 当前连接数: {{ networkInfo.connections }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-header">
          <i class="fas fa-heartbeat"></i>
          <span>服务状态</span>
        </div>
        <div class="service-container">
          <div class="service-item">
            <span><i class="fas fa-globe"></i> Web 服务</span>
            <el-tag :type="services.web ? 'success' : 'danger'" size="small" effect="light">
              {{ services.web ? '运行中' : '异常' }}
            </el-tag>
          </div>
          <div class="service-item">
            <span><i class="fas fa-database"></i> 数据库</span>
            <el-tag :type="services.database ? 'success' : 'danger'" size="small" effect="light">
              {{ services.database ? '运行中' : '异常' }}
            </el-tag>
          </div>
          <div class="service-item">
            <span><i class="fas fa-bolt"></i> 缓存服务</span>
            <el-tag :type="services.cache ? 'success' : 'danger'" size="small" effect="light">
              {{ services.cache ? '运行中' : '异常' }}
            </el-tag>
          </div>
        </div>
        <div class="info-footer">
          <span><i class="fas fa-check-circle" style="color: #10B981;"></i> 整体健康度: 优秀</span>
        </div>
      </div>
    </div>

    <!-- 第四行：运维摘要 + 系统事件 -->
    <div class="summary-row">
      <div class="summary-card">
        <div class="summary-header">
          <i class="fas fa-chart-pie"></i>
          <span>运维摘要</span>
          <span class="badge">实时</span>
        </div>
        <div class="summary-stats">
          <div class="summary-item">
            <i class="fas fa-check-circle" style="color: #10B981;"></i>
            <span>服务状态: <strong>健康</strong></span>
          </div>
          <div class="summary-item">
            <i class="fas fa-database"></i>
            <span>数据库连接池: <strong>活跃</strong></span>
          </div>
          <div class="summary-item">
            <i class="fas fa-shield-alt"></i>
            <span>今日拦截: <strong>0</strong> 次异常</span>
          </div>
          <div class="summary-item">
            <i class="fas fa-clock"></i>
            <span>最后同步: <strong>{{ lastSyncTime }}</strong></span>
          </div>
        </div>
      </div>

      <div class="events-card">
        <div class="events-header">
          <i class="fas fa-history"></i>
          <span>系统事件</span>
          <el-button size="small" text @click="clearEvents" class="clear-btn">
            <i class="fas fa-trash-alt"></i> 清空
          </el-button>
        </div>
        <div class="events-list">
          <div v-for="(event, index) in eventLogs" :key="index" class="event-item">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-tag" :class="event.type">
              {{ event.typeText }}
            </span>
            <span class="event-msg">{{ event.message }}</span>
          </div>
          <div v-if="eventLogs.length === 0" class="events-empty">
            <i class="fas fa-inbox"></i>
            <p>暂无系统事件</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 原始数据
const posts = ref([])
const comments = ref([])

// 硬件监控数据
const hardwareLoading = ref(false)
const cpuInfo = ref({ usage: 0, cores: '8', speed: '2.4 GHz' })
const memoryInfo = ref({ total: '8 GB', used: '0 GB', free: '0 GB', percent: 0 })
const diskInfo = ref({ total: '100 GB', used: '0 GB', free: '0 GB', percent: 0 })
const loadInfo = ref({ load1: 0, load5: 0, load15: 0 })
const networkInfo = ref({ download: '0 KB/s', upload: '0 KB/s', connections: 0 })
const services = ref({ web: true, database: true, cache: true })
const uptimeInfo = ref('0天 0小时')
const lastSyncTime = ref(new Date().toLocaleString())
const eventLogs = ref([])

// 定时器
let hardwareInterval = null
let eventGeneratorInterval = null

// 计算属性
const totalPosts = computed(() => posts.value.length)
const totalComments = computed(() => comments.value.length)
const pendingComments = computed(() => comments.value.filter(c => c.status === 'pending').length)

// 获取进度条颜色
const getProgressColor = (percent) => {
  if (percent < 50) return '#10B981'
  if (percent < 75) return '#F59E0B'
  return '#EF4444'
}

// 获取负载样式
const getLoadClass = (load) => {
  if (load < 1) return 'load-low'
  if (load < 2) return 'load-mid'
  return 'load-high'
}

// 加载文章和评论数据
const loadData = () => {
  const p = localStorage.getItem('flat_admin_posts')
  const c = localStorage.getItem('flat_admin_comments')
  posts.value = p ? JSON.parse(p) : []
  comments.value = c ? JSON.parse(c) : []
}

// 获取服务器硬件信息
const getHardwareInfo = () => {
  const newCpuUsage = Math.floor(Math.random() * 60) + 15
  cpuInfo.value = {
    usage: newCpuUsage,
    cores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : '8',
    speed: '2.4 GHz'
  }

  const totalMemoryGB = 8
  const usedPercent = Math.min(90, Math.max(20, newCpuUsage * 0.8 + Math.random() * 10))
  const usedGB = (totalMemoryGB * usedPercent / 100).toFixed(1)
  const freeGB = (totalMemoryGB - parseFloat(usedGB)).toFixed(1)
  memoryInfo.value = {
    total: `${totalMemoryGB} GB`,
    used: `${usedGB} GB`,
    free: `${freeGB} GB`,
    percent: Math.round(usedPercent)
  }

  const totalDiskGB = 100
  const diskPercent = Math.min(85, Math.max(25, 35 + Math.random() * 30))
  const usedDisk = (totalDiskGB * diskPercent / 100).toFixed(1)
  const freeDisk = (totalDiskGB - parseFloat(usedDisk)).toFixed(1)
  diskInfo.value = {
    total: `${totalDiskGB} GB`,
    used: `${usedDisk} GB`,
    free: `${freeDisk} GB`,
    percent: Math.round(diskPercent)
  }

  loadInfo.value = {
    load1: Number((newCpuUsage / 100 + Math.random() * 0.3).toFixed(2)),
    load5: Number((newCpuUsage / 100 + Math.random() * 0.2).toFixed(2)),
    load15: Number((newCpuUsage / 100 + Math.random() * 0.15).toFixed(2))
  }

  networkInfo.value = {
    download: `${Math.floor(Math.random() * 300 + 20)} KB/s`,
    upload: `${Math.floor(Math.random() * 100 + 10)} KB/s`,
    connections: Math.floor(Math.random() * 80 + 10)
  }

  const uptimeHours = Math.floor(Math.random() * 720)
  uptimeInfo.value = `${Math.floor(uptimeHours / 24)}天 ${uptimeHours % 24}小时`
}

// 刷新硬件信息
const refreshHardwareInfo = async () => {
  hardwareLoading.value = true
  try {
    getHardwareInfo()
    lastSyncTime.value = new Date().toLocaleString()
    addEventLog('info', '手动刷新硬件监控数据')
  } finally {
    hardwareLoading.value = false
  }
}

// 添加系统事件日志
const addEventLog = (type, message) => {
  const typeMap = { info: '信息', warning: '警告', error: '错误', success: '成功' }
  eventLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    type: type,
    typeText: typeMap[type] || '信息',
    message: message
  })
  if (eventLogs.value.length > 30) {
    eventLogs.value = eventLogs.value.slice(0, 30)
  }
}

// 清空事件日志
const clearEvents = () => {
  eventLogs.value = []
  addEventLog('info', '系统事件日志已清空')
}

// 生成随机系统事件
const generateRandomEvent = () => {
  const events = [
    { type: 'info', message: '定时任务执行完成' },
    { type: 'info', message: '数据库备份成功' },
    { type: 'warning', message: 'CPU使用率超过70%' },
    { type: 'success', message: '文章发布成功' },
    { type: 'info', message: '缓存清理完成' }
  ]
  const randomEvent = events[Math.floor(Math.random() * events.length)]
  addEventLog(randomEvent.type, randomEvent.message)
}

// 处理存储更新
const handleStorageUpdate = () => {
  loadData()
  addEventLog('info', '数据已同步更新')
}

// 启动定时器
const startIntervals = () => {
  hardwareInterval = setInterval(() => getHardwareInfo(), 10000)
  eventGeneratorInterval = setInterval(() => {
    if (Math.random() > 0.7) generateRandomEvent()
  }, 30000)
}

// 停止定时器
const stopIntervals = () => {
  if (hardwareInterval) clearInterval(hardwareInterval)
  if (eventGeneratorInterval) clearInterval(eventGeneratorInterval)
}

onMounted(() => {
  loadData()
  getHardwareInfo()
  startIntervals()
  window.addEventListener('storageUpdate', handleStorageUpdate)
  addEventLog('info', '系统监控面板已启动')
})

onBeforeUnmount(() => {
  stopIntervals()
  window.removeEventListener('storageUpdate', handleStorageUpdate)
})
</script>

<style scoped>
.fade-in {
  animation: fade 0.15s ease;
}
@keyframes fade {
  from { opacity: 0; transform: translateY(3px);}
  to { opacity: 1; }
}

/* 第一行：统计卡片（等宽4列） */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: #64748B;
  margin-top: 4px;
}

/* 区域标题 */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}

.section-title i {
  font-size: 18px;
  color: #3B82F6;
}

.refresh-btn {
  margin-left: auto;
}

/* 第二行：监控卡片（等宽3列） */
.monitor-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.monitor-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  transition: all 0.2s;
}

.monitor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.monitor-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.monitor-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cpu-icon { background: #EFF6FF; }
.cpu-icon i { color: #3B82F6; font-size: 20px; }
.memory-icon { background: #ECFDF5; }
.memory-icon i { color: #10B981; font-size: 20px; }
.disk-icon { background: #FEF3C7; }
.disk-icon i { color: #F59E0B; font-size: 20px; }

.monitor-title {
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.monitor-value {
  margin-bottom: 12px;
}

.value-number {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
}

.value-unit {
  font-size: 14px;
  color: #64748B;
}

.monitor-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12px;
  color: #64748B;
}

.monitor-footer i {
  margin-right: 4px;
}

/* 第三行：信息卡片（等宽3列） */
.info-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.info-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  transition: all 0.2s;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.info-header i {
  font-size: 18px;
  color: #3B82F6;
}

.load-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 12px;
}

.load-item {
  text-align: center;
  flex: 1;
}

.load-label {
  display: block;
  font-size: 12px;
  color: #64748B;
  margin-bottom: 6px;
}

.load-value {
  font-size: 22px;
  font-weight: 600;
}

.load-low { color: #10B981; }
.load-mid { color: #F59E0B; }
.load-high { color: #EF4444; }

.network-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 12px;
}

.network-item {
  text-align: center;
  flex: 1;
}

.network-direction {
  font-size: 13px;
  margin-bottom: 8px;
}
.network-direction.down { color: #10B981; }
.network-direction.up { color: #F59E0B; }

.network-speed {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
}

.service-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #475569;
}

.service-item i {
  margin-right: 8px;
  width: 16px;
}

.info-footer {
  padding-top: 12px;
  border-top: 1px solid #EDF2F7;
  font-size: 12px;
  color: #64748B;
}

/* 第四行：摘要 + 事件（2列布局） */
.summary-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
}

.summary-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 20px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.summary-header i {
  font-size: 18px;
  color: #3B82F6;
}

.badge {
  background: #EFF6FF;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  color: #1E40AF;
  margin-left: auto;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
}

.summary-item i {
  width: 18px;
}

.events-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.events-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid #EDF2F7;
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.events-header i {
  font-size: 18px;
  color: #3B82F6;
}

.clear-btn {
  margin-left: auto;
}

.events-list {
  max-height: 280px;
  overflow-y: auto;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid #EDF2F7;
  font-size: 13px;
}

.event-item:hover {
  background: #F8FAFE;
}

.event-time {
  color: #9CA3AF;
  font-size: 12px;
  min-width: 80px;
}

.event-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  min-width: 44px;
  text-align: center;
}

.event-tag.info { background: #EFF6FF; color: #3B82F6; }
.event-tag.warning { background: #FEF3C7; color: #F59E0B; }
.event-tag.error { background: #FEE2E2; color: #EF4444; }
.event-tag.success { background: #ECFDF5; color: #10B981; }

.event-msg {
  color: #475569;
  flex: 1;
}

.events-empty {
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
}

.events-empty i {
  font-size: 40px;
  margin-bottom: 12px;
}

/* 暗色主题 */
body.dark-for-flat .stat-card,
body.dark-for-flat .monitor-card,
body.dark-for-flat .info-card,
body.dark-for-flat .summary-card,
body.dark-for-flat .events-card {
  background: #1E293B;
  border-color: #334155;
}

body.dark-for-flat .stat-number,
body.dark-for-flat .value-number,
body.dark-for-flat .network-speed {
  color: #F1F5F9;
}

body.dark-for-flat .stat-label,
body.dark-for-flat .monitor-title,
body.dark-for-flat .info-header,
body.dark-for-flat .service-item,
body.dark-for-flat .summary-item {
  color: #94A3B8;
}

body.dark-for-flat .monitor-footer,
body.dark-for-flat .info-footer {
  color: #64748B;
}

body.dark-for-flat .event-item {
  border-color: #334155;
}

body.dark-for-flat .event-item:hover {
  background: #2D3A4E;
}

body.dark-for-flat .event-msg {
  color: #CBD5E1;
}

body.dark-for-flat .section-title {
  color: #E2E8F0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .stats-row { gap: 16px; }
  .monitor-row { gap: 16px; }
  .info-row { gap: 16px; }
}

@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .monitor-row { grid-template-columns: 1fr; }
  .info-row { grid-template-columns: 1fr; }
  .summary-row { grid-template-columns: 1fr; }
}

@media (max-width: 500px) {
  .stats-row { grid-template-columns: 1fr; }
  .summary-stats { grid-template-columns: 1fr; }
}
</style>