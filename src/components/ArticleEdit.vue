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

    <!-- md-editor-v3 编辑器 -->
    <div class="editor-container">
      <MdEditor
          v-model="article.content"
          :toolbars="toolbars"
          :toolbars-exclude="toolbarsExclude"
          :theme="editorTheme"
          language="zh-CN"
          :preview="true"
          :html-preview="false"
          :code-style="codeStyle"
          :editor-id="'markdown-editor'"
          @onSave="handleEditorSave"
          @onUploadImg="handleUploadImage"
          class="markdown-editor"
      />
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
                <el-option label="AI 技术" value="AI 技术" />
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
                <el-button size="small" type="danger" text @click="article.coverImage = ''">
                  删除
                </el-button>
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
            <div class="setting-item">
              <label><i class="fas fa-eye"></i> 文章状态</label>
              <div class="status-info">
                <el-tag :type="article.status === 'published' ? 'success' : 'info'">
                  {{ article.status === 'published' ? '已发布' : '草稿' }}
                </el-tag>
                <span v-if="article.date" class="date-info">
                  <i class="fas fa-calendar-alt"></i> {{ article.date }}
                </span>
              </div>
            </div>
            <div class="setting-item">
              <label><i class="fas fa-chart-line"></i> SEO 关键词</label>
              <el-input
                  v-model="article.seoKeywords"
                  placeholder="输入 SEO 关键词，用逗号分隔"
              />
            </div>
            <div class="setting-item">
              <label><i class="fas fa-font"></i> 字数统计</label>
              <div class="word-count">
                <span>当前字数: {{ wordCount }} 字</span>
                <span v-if="wordCount > 0" class="reading-time">
                  预计阅读: {{ readingTime }} 分钟
                </span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, Picture } from '@element-plus/icons-vue'
import {MdEditor} from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

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
  seoKeywords: '',
  status: 'draft',
  date: ''
})

// UI 状态
const saving = ref(false)
const publishing = ref(false)
const activeCollapse = ref(['settings'])

// 编辑器主题
const editorTheme = computed(() => {
  return document.body.classList.contains('dark-for-flat') ? 'dark' : 'light'
})

// 代码样式
const codeStyle = ref({
  'white-space': 'pre-wrap',
  'word-break': 'break-all',
  'font-family': 'Consolas, Monaco, "Courier New", monospace'
})

// 工具栏配置 - 完整功能
const toolbars = [
  'bold',
  'italic',
  'underline',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'taskList',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  'revoke',
  'next',
  'save',
  '=',
  'preview',
  'htmlPreview',
  'catalog',
  'github'
]

// 排除的工具栏（保留全部）
const toolbarsExclude = ref([])

// 标签选项
const tagOptions = ref([
  'Vue.js', 'React', 'JavaScript', 'TypeScript', 'Node.js',
  'Python', 'Docker', 'Kubernetes', 'Linux', '数据库',
  'AI', '机器学习', '前端工程化', '性能优化', '面试'
])

// 字数统计
const wordCount = computed(() => {
  if (!article.value.content) return 0
  // 移除 Markdown 语法后统计中文字符和英文单词
  const plainText = article.value.content
      .replace(/[#*`>~\[\]()_+\-=[\]{}|\\]/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .trim()
  // 统计中文字符 + 英文单词
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length
  return chineseChars + englishWords
})

// 预计阅读时间（按每分钟 300 字计算）
const readingTime = computed(() => {
  if (wordCount.value === 0) return 0
  return Math.max(1, Math.ceil(wordCount.value / 300))
})

// 编辑器保存事件处理
const handleEditorSave = (value, html) => {
  saveAsDraft()
}

// 处理图片上传（可扩展为上传到服务器）
const handleUploadImage = async (files, callback) => {
  // 模拟图片上传，实际项目中可替换为上传到服务器
  const promises = files.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        // 这里可以替换为真实的上传接口
        // 示例：使用 base64 直接显示（仅用于演示）
        resolve(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  })

  const urls = await Promise.all(promises)
  callback(urls)
}

// 返回上一页
const goBack = () => {
  const hasContent = article.value.content.trim() || article.value.title.trim()
  if (hasContent && article.value.status === 'draft') {
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

    // 自动生成摘要
    let summary = article.value.summary
    if (!summary && article.value.content) {
      const plainText = article.value.content
          .replace(/[#*`>~\[\]()_+\-=[\]{}|\\]/g, '')
          .replace(/!\[.*?\]\(.*?\)/g, '')
          .replace(/\[.*?\]\(.*?\)/g, '')
          .slice(0, 150)
      summary = plainText + (plainText.length >= 150 ? '...' : '')
    }

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
          summary: summary,
          seoKeywords: article.value.seoKeywords,
          status: '草稿',
          date: now
        }
      }
    } else {
      const newArticle = {
        id: Date.now(),
        title: article.value.title,
        content: article.value.content,
        category: article.value.category,
        tags: article.value.tags,
        coverImage: article.value.coverImage,
        summary: summary,
        seoKeywords: article.value.seoKeywords,
        status: '草稿',
        date: now
      }
      posts.unshift(newArticle)
      article.value.id = newArticle.id
    }

    localStorage.setItem('flat_admin_posts', JSON.stringify(posts))
    window.dispatchEvent(new Event('storageUpdate'))
    article.value.status = 'draft'
    ElMessage.success('已保存为草稿')
  } catch (error) {
    console.error(error)
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

    // 自动生成摘要
    let summary = article.value.summary
    if (!summary && article.value.content) {
      const plainText = article.value.content
          .replace(/[#*`>~\[\]()_+\-=[\]{}|\\]/g, '')
          .replace(/!\[.*?\]\(.*?\)/g, '')
          .replace(/\[.*?\]\(.*?\)/g, '')
          .slice(0, 150)
      summary = plainText + (plainText.length >= 150 ? '...' : '')
    }

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
          summary: summary,
          seoKeywords: article.value.seoKeywords,
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
        summary: summary,
        seoKeywords: article.value.seoKeywords,
        status: '已发布',
        date: now
      }
      posts.unshift(newArticle)
      article.value.id = newId
    }

    localStorage.setItem('flat_admin_posts', JSON.stringify(posts))
    window.dispatchEvent(new Event('storageUpdate'))
    article.value.status = 'published'
    ElMessage.success('文章发布成功！')

    setTimeout(() => {
      router.push('/posts')
    }, 1000)
  } catch (error) {
    console.error(error)
    ElMessage.error('发布失败')
  } finally {
    publishing.value = false
  }
}

// 选择封面图片
const selectCoverImage = () => {
  const url = prompt('请输入图片URL地址：\n推荐使用 unsplash、picsum 等图床',
      'https://picsum.photos/id/' + Math.floor(Math.random() * 100) + '/800/400')
  if (url && url.trim()) {
    article.value.coverImage = url.trim()
  }
}

// 加载文章数据
const loadArticle = () => {
  const id = route.params.id
  if (id && id !== 'new') {
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
        seoKeywords: targetPost.seoKeywords || '',
        status: targetPost.status === '已发布' ? 'published' : 'draft',
        date: targetPost.date || ''
      }
    } else {
      ElMessage.error('文章不存在')
      router.push('/posts')
    }
  } else {
    article.value = {
      id: null,
      title: '',
      content: '# 欢迎使用 Markdown 编辑器\n\n在这里开始撰写你的精彩文章...\n\n## 功能特性\n\n- 支持 Markdown 语法\n- 实时预览\n- 代码高亮\n- 表格支持\n- 图片上传\n- 任务列表\n- 数学公式\n- 流程图\n\n> 享受写作的乐趣！',
      category: '',
      tags: [],
      coverImage: '',
      summary: '',
      seoKeywords: '',
      status: 'draft',
      date: ''
    }
  }
}

// 键盘快捷键支持
const handleKeydown = (e) => {
  // Ctrl/Cmd + S 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    saveAsDraft()
  }
  // Ctrl/Cmd + Shift + S 发布
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
    e.preventDefault()
    publishArticle()
  }
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  loadArticle()
}, { immediate: true })

// 监听主题变化
const observer = new MutationObserver(() => {
  // 主题变化时强制刷新编辑器主题
  nextTick(() => {
    // md-editor-v3 会自动适配主题，无需额外操作
  })
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  loadArticle()
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  observer.disconnect()
})
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
  flex-shrink: 0;
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

/* 编辑器容器 */
.editor-container {
  flex: 1;
  overflow: hidden;
  padding: 0 20px;
  min-height: 0;
}

.markdown-editor {
  height: 100% !important;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

/* 底部设置区 */
.editor-footer {
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  padding: 0 20px;
  flex-shrink: 0;
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
  display: flex;
  align-items: center;
  gap: 12px;
}

.cover-preview img {
  max-width: 150px;
  max-height: 80px;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-info {
  font-size: 0.8rem;
  color: #64748B;
}

.word-count {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #64748B;
}

.reading-time {
  color: #3B82F6;
}

/* 暗色主题适配 */
body.dark-for-flat .article-editor {
  background: #0F172A;
}

body.dark-for-flat .editor-header,
body.dark-for-flat .editor-footer {
  background: #1E293B;
  border-color: #334155;
}

body.dark-for-flat .markdown-editor {
  border-color: #334155;
}

body.dark-for-flat .setting-item label {
  color: #94A3B8;
}

body.dark-for-flat .word-count {
  color: #94A3B8;
}

/* 响应式 */
@media (max-width: 768px) {
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

  .editor-container {
    padding: 0 12px;
  }
}
</style>