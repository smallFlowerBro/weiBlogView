<template>
  <div class="fade-in">
    <div class="stat-grid">
      <div class="stat-card">
        <h4><i class="far fa-file-alt"></i> 总文章</h4>
        <div class="stat-number">{{ totalPosts }}</div>
      </div>
      <div class="stat-card">
        <h4><i class="far fa-comment"></i> 评论总量</h4>
        <div class="stat-number">{{ totalComments }}</div>
      </div>
      <div class="stat-card">
        <h4><i class="fas fa-clock"></i> 待审评论</h4>
        <div class="stat-number">{{ pendingComments }}</div>
      </div>
      <div class="stat-card">
        <h4><i class="fas fa-chart-line"></i> 周访问量</h4>
        <div class="stat-number">1,284</div>
      </div>
    </div>
    <div class="glass-panel">
      <div class="flex-between">
        <h3 style="font-size:1rem;">📊 运维摘要</h3>
        <span class="badge">实时</span>
      </div>
      <div style="margin-top:12px; display:flex; gap:20px; flex-wrap:wrap;">
        <div><i class="fas fa-check-circle" style="color:#10B981;"></i> 服务状态: 健康</div>
        <div><i class="fas fa-database"></i> 数据库连接池: 活跃</div>
        <div><i class="fas fa-shield-alt"></i> 今日拦截: 0 次异常</div>
      </div>
      <div style="margin-top:14px; background:#F8FAFE; padding:12px; border-radius:6px; font-size:12px;">
        > 最后同步: 2025-05-09 10:30 · Vue 3 + Element Plus 控制台
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const posts = ref([])
const comments = ref([])

const totalPosts = computed(() => posts.value.length)
const totalComments = computed(() => comments.value.length)
const pendingComments = computed(() => comments.value.filter(c => c.status === 'pending').length)

const loadData = () => {
  const p = localStorage.getItem('flat_admin_posts')
  const c = localStorage.getItem('flat_admin_comments')
  posts.value = p ? JSON.parse(p) : []
  comments.value = c ? JSON.parse(c) : []
}

const handleStorageUpdate = () => {
  loadData()
}

onMounted(() => {
  loadData()
  window.addEventListener('storageUpdate', handleStorageUpdate)
})

onUnmounted(() => {
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
</style>