<template>
  <div class="glass-panel">
    <h3 style="font-size:1rem;"><i class="fas fa-inbox"></i> 用户评论</h3>
    <el-table :data="comments" style="width:100%; margin-top:16px">
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="postTitle" label="所属文章" width="150" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <span :class="['badge', row.status === 'pending' ? 'badge-warning' : '']">
            {{ row.status === 'pending' ? '待审核' : '已通过' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 'pending'"
            link
            type="success"
            size="small"
            @click="approve(row.id)"
          >
            <i class="fas fa-check-circle"></i> 通过
          </el-button>
          <el-button link type="danger" size="small" @click="remove(row.id)">
            <i class="fas fa-trash-alt"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const comments = ref([])

const loadComments = () => {
  const c = localStorage.getItem('flat_admin_comments')
  comments.value = c ? JSON.parse(c) : []
}

const saveComments = () => {
  localStorage.setItem('flat_admin_comments', JSON.stringify(comments.value))
  window.dispatchEvent(new Event('storageUpdate'))
}

const approve = (id) => {
  comments.value = comments.value.map(c =>
    c.id === id ? { ...c, status: 'approved' } : c
  )
  saveComments()
  ElMessage.success('已通过审核')
}

const remove = (id) => {
  ElMessageBox.confirm('删除评论不可恢复', '提示', { type: 'warning' }).then(() => {
    comments.value = comments.value.filter(c => c.id !== id)
    saveComments()
    ElMessage.success('已删除')
  }).catch(() => {})
}

const handleStorageUpdate = () => {
  loadComments()
}

onMounted(() => {
  loadComments()
  window.addEventListener('storageUpdate', handleStorageUpdate)
})

onUnmounted(() => {
  window.removeEventListener('storageUpdate', handleStorageUpdate)
})
</script>