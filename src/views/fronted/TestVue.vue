<template>
  <div class="article-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-header">
      <div class="header-left">
        <el-button @click="goBack" :icon="ArrowLeft">返回</el-button>
        <div class="title-input-wrapper">
          <el-input
              v-model="article.title"
              placeholder="输入文章标题..."
              class="title-input"
              :maxlength="100"
              show-word-limit
          />
        </div>
      </div>
      <div class="header-right">
        <el-button @click="saveAsDraft" :loading="saving">
          <i class="fas fa-save"></i> 存为草稿
        </el-button>
        <el-button type="primary" @click="publishArticle" :loading="publishing">
          <i class="fas fa-paper-plane"></i> 发布文章
        </el-button>
      </div>
    </div>

    <!-- 主编辑区 -->
    <div class="editor-main">
      <!-- 左侧编辑区 -->
      <div class="editor-left">
        <div class="editor-toolbar">
          <el-button-group>
            <el-button size="small" @click="insertMarkdown('**', '**')" title="加粗">
              <i class="fas fa-bold"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('*', '*')" title="斜体">
              <i class="fas fa-italic"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('# ', '')" title="标题">
              <i class="fas fa-heading"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('[', '](url)')" title="链接">
              <i class="fas fa-link"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('![', '](url)')" title="图片">
              <i class="fas fa-image"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('```\n', '\n```')" title="代码块">
              <i class="fas fa-code"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('- ', '')" title="无序列表">
              <i class="fas fa-list-ul"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('1. ', '')" title="有序列表">
              <i class="fas fa-list-ol"></i>
            </el-button>
            <el-button size="small" @click="insertMarkdown('> ', '')" title="引用">
              <i class="fas fa-quote-right"></i>
            </el-button>
          </el-button-group>
        </div>
        <el-input
            v-model="article.content"
            type="textarea"
            :rows="20"
            placeholder="使用 Markdown 编写文章内容..."
            class="content-textarea"
        />
      </div>

      <!-- 右侧预览区 -->
      <div class="editor-right">
        <div class="preview-header">
          <span><i class="fas fa-eye"></i> 实时预览</span>
          <el-tag size="small" type="info">Markdown</el-tag>
        </div>
        <div class="preview-content" v-html="renderedContent"></div>
      </div>
    </div>

    <!-- 底部设置区 -->
    <div class="editor-footer">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item name="settings" title="文章设置">
          <div class="settings-grid">
            <div class="setting-item">
              <label><i class="fas fa-tag"></i> 分类</label>
              <el-select v-model="article.category" placeholder="选择分类" clearable>
                <el-option label="技术分享" value="技术分享" />
                <el-option label="生活随笔" value="生活随笔" />
                <el-option label="运维笔记" value="运维笔记" />
                <el-option label="前端开发" value="前端开发" />
                <el-option label="后端架构" value="后端架构" />
              </el-select>
            </div>
            <div class="setting-item">
              <label><i class="fas fa-tags"></i> 标签</label>
              <el-select
                  v-model="article.tags"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="输入标签后回车"
                  style="width: 100%"
              >
                <el-option
                    v-for="tag in tagOptions"
                    :key="tag"
                    :label="tag"
                    :value="tag"
                />
              </el-select>
            </div>
            <div class="setting-item">
              <label><i class="fas fa-image"></i> 封面图片</label>
              <div class="cover-upload">
                <el-input v-model="article.coverImage" placeholder="输入图片URL或点击上传" />
                <el-button @click="selectCoverImage" :icon="Picture">选择图片</el-button>
              </div>
              <div v-if="article.coverImage" class="cover-preview">
                <img :src="article.coverImage" alt="封面预览" />
              </div>
            </div>
            <div class="setting-item">
              <label><i class="fas fa-align-left"></i> 摘要</label>
              <el-input
                  v-model="article.summary"
                  type="textarea"
                  :rows="3"
                  placeholder="文章摘要，留空则自动截取正文前150字"
                  :maxlength="300"
                  show-word-limit
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, Picture } from '@element-plus/icons-vue'
import { marked } from 'marked'

// 路由
const router = useRouter()
const route = useRoute()

// 文章数据
const article = ref({
  id: null,
  title: '',
  content: '',
  category: '',
  tags: [],
  coverImage: '',
  summary: '',
  status: 'draft',
  date: ''
})

// UI 状态
const saving = ref(false)
const publishing = ref(false)
const activeCollapse = ref(['settings'])

// 标签选项
const tagOptions = ref([
  'Vue.js', 'React', 'JavaScript', 'TypeScript', 'Node.js',
  'Python', 'Docker', 'Kubernetes', 'Linux', '数据库'
])

// 渲染 Markdown 内容
const renderedContent = computed(() => {
  if (!article.value.content) {
    return '<div style="color: #94A3B8; text-align: center; padding: 40px;">✨ 开始编写你的文章吧 ✨</div>'
  }
  try {
    return marked(article.value.content)
  } catch (e) {
    return '<div style="color: #EF4444;">Markdown 解析出错</div>'
  }
})

// 插入 Markdown 语法
const insertMarkdown = (prefix, suffix) => {
  const textarea = document.querySelector('.content-textarea textarea')
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = article.value.content.substring(start, end)
  const newText = article.value.content.substring(0, start) +
      prefix + selectedText + suffix +
      article.value.content.substring(end)

  article.value.content = newText

  // 恢复焦点和选中区域
  setTimeout(() => {
    textarea.focus()
    const newCursorPos = start + prefix.length + selectedText.length
    textarea.setSelectionRange(newCursorPos, newCursorPos)
  }, 10)
}

// 返回上一页
const goBack = () => {
  if (article.value.content || article.value.title) {
    ElMessageBox.confirm('文章尚未保存，确定要离开吗？', '提示', {
      confirmButtonText: '确定离开',
      cancelButtonText: '继续编辑',
      type: 'warning'
    }).then(() => {
      router.back()
    }).catch(() => {})
  } else {
    router.back()
  }
}

// 保存为草稿
const saveAsDraft = async () => {
  if (!article.value.title.trim()) {
    ElMessage.warning('请填写文章标题')
    return
  }

  saving.value = true
  try {
    const now = new Date().toISOString().slice(0, 10)
    const posts = JSON.parse(localStorage.getItem('flat_admin_posts') || '[]')

    if (article.value.id) {
      // 更新现有文章
      const index = posts.findIndex(p => p.id === article.value.id)
      if (index !== -1) {
        posts[index] = {
          ...posts[index],
          title: article.value.title,
          content: article.value.content,
          category: article.value.category,
          tags: article.value.tags,
          coverImage: article.value.coverImage,
          summary: article.value.summary,
          status: '草稿',
          date: now
        }
      }
    } else {
      // 新建文章
      const newArticle = {
        id: Date.now(),
        title: article.value.title,
        content: article.value.content,
        category: article.value.category,
        tags: article.value.tags,
        coverImage: article.value.coverImage,
        summary: article.value.summary,
        status: '草稿',
        date: now
      }
      posts.unshift(newArticle)
      article.value.id = newArticle.id
    }

    localStorage.setItem('flat_admin_posts', JSON.stringify(posts))
    window.dispatchEvent(new Event('storageUpdate'))
    ElMessage.success('已保存为草稿')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

// 发布文章
const publishArticle = async () => {
  if (!article.value.title.trim()) {
    ElMessage.warning('请填写文章标题')
    return
  }
  if (!article.value.content.trim()) {
    ElMessage.warning('请填写文章内容')
    return
  }

  publishing.value = true
  try {
    const now = new Date().toISOString().slice(0, 10)
    const posts = JSON.parse(localStorage.getItem('flat_admin_posts') || '[]')

    if (article.value.id) {
      const index = posts.findIndex(p => p.id === article.value.id)
      if (index !== -1) {
        posts[index] = {
          ...posts[index],
          title: article.value.title,
          content: article.value.content,
          category: article.value.category,
          tags: article.value.tags,
          coverImage: article.value.coverImage,
          summary: article.value.summary,
          status: '已发布',
          date: now
        }
      }
    } else {
      const newId = Date.now()
      const newArticle = {
        id: newId,
        title: article.value.title,
        content: article.value.content,
        category: article.value.category,
        tags: article.value.tags,
        coverImage: article.value.coverImage,
        summary: article.value.summary,
        status: '已发布',
        date: now
      }
      posts.unshift(newArticle)
      article.value.id = newId
    }

    localStorage.setItem('flat_admin_posts', JSON.stringify(posts))
    window.dispatchEvent(new Event('storageUpdate'))
    ElMessage.success('文章发布成功！')

    // 延迟后返回列表
    setTimeout(() => {
      router.push('/posts')
    }, 1000)
  } catch (error) {
    ElMessage.error('发布失败')
  } finally {
    publishing.value = false
  }
}

// 选择封面图片（模拟）
const selectCoverImage = () => {
  const url = prompt('请输入图片URL地址：', 'https://picsum.photos/800/400?random=' + Date.now())
  if (url) {
    article.value.coverImage = url
  }
}

// 加载文章数据（编辑模式）
const loadArticle = () => {
  const id = route.params.id
  if (id) {
    const posts = JSON.parse(localStorage.getItem('flat_admin_posts') || '[]')
    const targetPost = posts.find(p => p.id === parseInt(id))
    if (targetPost) {
      article.value = {
        id: targetPost.id,
        title: targetPost.title || '',
        content: targetPost.content || '',
        category: targetPost.category || '',
        tags: targetPost.tags || [],
        coverImage: targetPost.coverImage || '',
        summary: targetPost.summary || '',
        status: targetPost.status === '已发布' ? 'published' : 'draft',
        date: targetPost.date || ''
      }
    } else {
      ElMessage.error('文章不存在')
      router.push('/posts')
    }
  }
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  loadArticle()
}, { immediate: true })
</script>

<style scoped>
.article-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F8FAFE;
}

/* 顶部工具栏 */
.editor-header {
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.title-input-wrapper {
  flex: 1;
  max-width: 500px;
}

.title-input :deep(.el-input__wrapper) {
  box-shadow: none;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
}

.title-input :deep(.el-input__wrapper:hover) {
  border-color: #3B82F6;
}

.title-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.header-right {
  display: flex;
  gap: 12px;
}

/* 主编辑区 */
.editor-main {
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  min-height: 0;
}

.editor-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.editor-toolbar {
  padding: 12px;
  border-bottom: 1px solid #E2E8F0;
  background: #FAFCFE;
}

.content-textarea {
  flex: 1;
}

.content-textarea :deep(.el-textarea__inner) {
  height: 100% !important;
  resize: none;
  border: none;
  border-radius: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.editor-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.preview-header {
  padding: 12px 16px;
  border-bottom: 1px solid #E2E8F0;
  background: #FAFCFE;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
}

.preview-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  font-size: 14px;
  line-height: 1.8;
}

/* Markdown 预览样式 */
.preview-content :deep(h1) {
  font-size: 1.8rem;
  margin: 1rem 0 0.5rem;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0.3rem;
}

.preview-content :deep(h2) {
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem;
}

.preview-content :deep(h3) {
  font-size: 1.25rem;
  margin: 0.8rem 0 0.5rem;
}

.preview-content :deep(p) {
  margin: 0.8rem 0;
}

.preview-content :deep(code) {
  background: #F1F5F9;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

.preview-content :deep(pre) {
  background: #1E293B;
  color: #E2E8F0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.preview-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #3B82F6;
  margin: 1rem 0;
  padding-left: 1rem;
  color: #64748B;
}

.preview-content :deep(ul), .preview-content :deep(ol) {
  padding-left: 1.5rem;
  margin: 0.8rem 0;
}

.preview-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}

.preview-content :deep(a) {
  color: #3B82F6;
  text-decoration: none;
}

.preview-content :deep(a:hover) {
  text-decoration: underline;
}

/* 底部设置区 */
.editor-footer {
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  padding: 0 20px;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 16px 0;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
}

.setting-item label i {
  margin-right: 6px;
  color: #64748B;
}

.cover-upload {
  display: flex;
  gap: 8px;
}

.cover-preview {
  margin-top: 8px;
}

.cover-preview img {
  max-width: 200px;
  max-height: 120px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

/* 暗色主题适配 */
body.dark-for-flat .article-editor {
  background: #0F172A;
}

body.dark-for-flat .editor-header,
body.dark-for-flat .editor-left,
body.dark-for-flat .editor-right,
body.dark-for-flat .editor-footer {
  background: #1E293B;
  border-color: #334155;
}

body.dark-for-flat .editor-toolbar,
body.dark-for-flat .preview-header {
  background: #16212E;
  border-color: #334155;
}

body.dark-for-flat .preview-content :deep(code) {
  background: #2D3A4E;
  color: #E2E8F0;
}

body.dark-for-flat .preview-content :deep(blockquote) {
  color: #94A3B8;
}

body.dark-for-flat .setting-item label {
  color: #94A3B8;
}

/* 响应式 */
@media (max-width: 768px) {
  .editor-main {
    flex-direction: column;
    gap: 12px;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .header-left {
    flex-wrap: wrap;
  }

  .title-input-wrapper {
    max-width: none;
    width: 100%;
  }
}
</style>