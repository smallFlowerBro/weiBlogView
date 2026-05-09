<template>
  <div class="glass-panel">
    <div class="flex-between">
      <h3 style="font-size:1rem;"><i class="fas fa-file-alt"></i> 文章列表</h3>
      <el-button type="primary" size="small" @click="createPost">
        <i class="fas fa-plus"></i> 新建文章
      </el-button>
    </div>
    <el-table :data="posts" style="width: 100%; margin-top:16px" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="date" label="发布日期" width="120" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <span :class="['badge', row.status === '草稿' ? 'badge-warning' : '']">{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editPost(row)">
            <i class="fas fa-edit"></i> 编辑
          </el-button>
          <el-button link type="danger" size="small" @click="deletePost(row.id)">
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

const posts = ref([])

const loadPosts = () => {
  const p = localStorage.getItem('flat_admin_posts')
  posts.value = p ? JSON.parse(p) : []
}

const savePosts = () => {
  localStorage.setItem('flat_admin_posts', JSON.stringify(posts.value))
  window.dispatchEvent(new Event('storageUpdate'))
}

const createPost = () => {
  const title = prompt('输入文章标题')
  if (title) {
    const newId = Date.now()
    posts.value.push({
      id: newId,
      title: title,
      date: new Date().toISOString().slice(0, 10),
      status: '草稿'
    })
    savePosts()
    ElMessage.success('新建成功')
  }
}

const editPost = (row) => {
  const newTitle = prompt('编辑标题', row.title)
  if (newTitle && newTitle !== row.title) {
    row.title = newTitle
    savePosts()
    ElMessage.success('编辑成功')
  }
}

const deletePost = (id) => {
  ElMessageBox.confirm('删除文章不可恢复，确定吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    posts.value = posts.value.filter(p => p.id !== id)
    savePosts()
    ElMessage.success('已删除')
  }).catch(() => {})
}

const handleStorageUpdate = () => {
  loadPosts()
}

onMounted(() => {
  loadPosts()
  window.addEventListener('storageUpdate', handleStorageUpdate)
})

onUnmounted(() => {
  window.removeEventListener('storageUpdate', handleStorageUpdate)
})
</script>