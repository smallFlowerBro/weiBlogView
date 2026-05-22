<template>
  <div class="article-list">
    <!-- 顶部统计卡片 -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background: #EFF6FF;">
          <i class="fas fa-file-alt" style="color: #3B82F6;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalCount }}</div>
          <div class="stat-label">总文章</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #ECFDF5;">
          <i class="fas fa-eye" style="color: #10B981;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ publishedCount }}</div>
          <div class="stat-label">已发布</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #FEF3C7;">
          <i class="fas fa-pencil-alt" style="color: #F59E0B;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ draftCount }}</div>
          <div class="stat-label">草稿箱</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #FEE2E2;">
          <i class="fas fa-chart-line" style="color: #EF4444;"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalViews }}</div>
          <div class="stat-label">总浏览量</div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="filter-bar">
      <div class="filter-left">
        <el-input
            v-model="searchKeyword"
            placeholder="搜索标题或内容..."
            clearable
            style="width: 260px"
            @keyup.enter="handleSearch"
        >
          <template #prefix>
            <i class="fas fa-search"></i>
          </template>
        </el-input>
        <el-select v-model="filterStatus" placeholder="全部状态" clearable style="width: 120px">
          <el-option label="全部" value="" />
          <el-option label="已发布" value="published" />
          <el-option label="草稿" value="draft" />
        </el-select>
        <el-select v-model="filterCategory" placeholder="全部分类" clearable style="width: 140px">
          <el-option
              v-for="cat in categories"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
          />
        </el-select>
        <el-config-provider :locale="zhCn">
        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px"
        /></el-config-provider>
        <el-button type="primary" @click="handleSearch">
          <i class="fas fa-search"></i> 搜索
        </el-button>
        <el-button @click="resetFilters">
          <i class="fas fa-redo"></i> 重置
        </el-button>
      </div>
      <div class="filter-right">
        <el-button type="primary" @click="createArticle">
          <i class="fas fa-plus"></i> 写文章
        </el-button>
        <el-button @click="handleBatchDelete" :disabled="selectedIds.length === 0">
          <i class="fas fa-trash-alt"></i> 批量删除
        </el-button>
      </div>
    </div>

    <!-- 文章列表 - 卡片网格 -->
    <div class="articles-grid" v-loading="loading">
      <div
          v-for="article in paginatedArticles"
          :key="article.id"
          class="article-card"
          :class="{ 'is-draft': article.status === 'draft' }"
      >
        <!-- 封面图区域 -->
        <div class="card-cover" @click="viewArticle(article.id)">
          <img v-if="article.coverImage" :src="article.coverImage" :alt="article.title" />
          <div v-else class="cover-placeholder">
            <i class="fas fa-image"></i>
          </div>
          <div class="cover-overlay">
            <span class="view-detail">查看详情</span>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="card-content">
          <div class="card-header">
            <div class="card-category">
              <el-tag size="small" effect="plain" @click="filterByCategory(article.categoryId)">
                {{ article.categoryName || '未分类' }}
              </el-tag>
            </div>
            <div class="card-actions">
              <el-button link type="primary" size="small" @click="editArticle(article.id)" title="编辑">
                <i class="fas fa-edit"></i>
              </el-button>
              <el-button link type="danger" size="small" @click="deleteArticle(article.id)" title="删除">
                <i class="fas fa-trash-alt"></i>
              </el-button>
            </div>
          </div>

          <div class="card-title" @click="viewArticle(article.id)">
            {{ article.title }}
          </div>

          <div class="card-summary">
            {{ article.summary || stripMarkdown(article.content).slice(0, 120) + '...' }}
          </div>

          <div class="card-tags" v-if="article.tags && article.tags.length">
            <el-tag
                v-for="tag in article.tags.slice(0, 3)"
                :key="tag"
                size="small"
                type="info"
                effect="plain"
                class="tag-item"
                @click.stop="filterByTag(tag)"
            >
              {{ tag }}
            </el-tag>
            <span v-if="article.tags.length > 3" class="more-tags">+{{ article.tags.length - 3 }}</span>
          </div>

          <div class="card-footer">
            <div class="footer-info">
              <span class="status-badge" :class="article.status">
                <i :class="article.status === 'published' ? 'fas fa-check-circle' : 'fas fa-pencil-alt'"></i>
                {{ article.status === 'published' ? '已发布' : '草稿' }}
              </span>
              <span class="view-count">
                <i class="fas fa-eye"></i> {{ article.viewCount || 0 }}
              </span>
              <span class="comment-count">
                <i class="fas fa-comment"></i> {{ article.commentCount || 0 }}
              </span>
            </div>
            <div class="footer-time">
              <i class="fas fa-calendar-alt"></i> {{ formatDate(article.createdAt) }}
            </div>
          </div>
        </div>

        <!-- 勾选框 - 无背景色 -->
        <div class="card-checkbox">
          <el-checkbox v-model="selectedIds" :label="article.id" @change="handleSelectChange" />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredArticles.length === 0 && !loading" class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>暂无文章</p>
        <el-button type="primary" @click="createArticle">撰写第一篇文章</el-button>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="filteredArticles.length > 0">
      <el-config-provider :locale="zhCn">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 48, 96]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      /></el-config-provider>
    </div>

    <!-- 预览对话框 -->
    <el-dialog v-model="previewVisible" title="文章预览" width="800px" destroy-on-close>
      <div class="preview-content">
        <h1 class="preview-title">{{ previewArticle.title }}</h1>
        <div class="preview-meta">
          <span><i class="fas fa-folder-open"></i> {{ previewArticle.categoryName || '未分类' }}</span>
          <span><i class="fas fa-calendar"></i> {{ formatDate(previewArticle.createdAt) }}</span>
          <span><i class="fas fa-eye"></i> {{ previewArticle.viewCount || 0 }} 次阅读</span>
        </div>
        <div class="preview-body markdown-body" v-html="previewHtml"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import MarkdownIt from 'markdown-it'
import {zhCn} from "element-plus/es/locale/index";

const router = useRouter()

// 数据状态
const articles = ref([])
const categories = ref([])
const loading = ref(false)
const selectedIds = ref([])
const searchKeyword = ref('')
const filterStatus = ref('')
const filterCategory = ref('')
const dateRange = ref(null)
const currentPage = ref(1)
const pageSize = ref(12)

// 预览相关
const previewVisible = ref(false)
const previewArticle = ref({})
const previewHtml = ref('')

// Markdown 解析器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true
})

// 计算属性
const filteredArticles = computed(() => {
  let list = [...articles.value]

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(a =>
        a.title.toLowerCase().includes(keyword) ||
        a.content.toLowerCase().includes(keyword)
    )
  }

  if (filterStatus.value) {
    list = list.filter(a => a.status === filterStatus.value)
  }

  if (filterCategory.value) {
    list = list.filter(a => a.categoryId === filterCategory.value)
  }

  if (dateRange.value && dateRange.value.length === 2) {
    const [start, end] = dateRange.value
    list = list.filter(a => {
      const date = new Date(a.createdAt)
      return date >= start && date <= end
    })
  }

  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return list
})

const total = computed(() => filteredArticles.value.length)
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredArticles.value.slice(start, end)
})

const totalCount = computed(() => articles.value.length)
const publishedCount = computed(() => articles.value.filter(a => a.status === 'published').length)
const draftCount = computed(() => articles.value.filter(a => a.status === 'draft').length)
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.viewCount || 0), 0))

// 加载数据
const loadData = () => {
  loading.value = true
  try {
    const storedArticles = null
    if (storedArticles) {
      articles.value = JSON.parse(storedArticles).map(a => ({
        ...a,
        status: a.status === '已发布' ? 'published' : 'draft'
      }))
    } else {
      // 初始化示例数据（包含封面图）
      articles.value = [
        {
          id: 1,
          title: 'Vue 3 组合式 API 完全指南',
          content: '# Vue 3 组合式 API\n\n## 响应式 API\n\n`ref` 和 `reactive` 是 Vue 3 中最核心的响应式 API...',
          summary: '深入学习 Vue 3 组合式 API 的使用方法和最佳实践，掌握响应式编程的核心概念。',
          coverImage: 'https://picsum.photos/id/1/400/240',
          categoryId: 1,
          categoryName: '前端开发',
          tags: ['Vue.js', 'JavaScript', '前端'],
          status: 'published',
          viewCount: 1284,
          commentCount: 23,
          createdAt: '2026-05-15T10:30:00Z',
          updatedAt: '2026-05-15T10:30:00Z'
        },
        {
          id: 2,
          title: 'Spring Boot 3 新特性解析',
          content: '# Spring Boot 3 新特性\n\n## 最低要求变更\n\nJava 17 成为最低版本...',
          summary: 'Spring Boot 3 带来了哪些重大更新？从 Java 17 基线到 GraalVM 原生镜像支持，全面解析。',
          coverImage: 'https://picsum.photos/id/2/400/240',
          categoryId: 2,
          categoryName: '后端架构',
          tags: ['Spring Boot', 'Java', '微服务'],
          status: 'published',
          viewCount: 892,
          commentCount: 12,
          createdAt: '2026-05-12T14:20:00Z',
          updatedAt: '2026-05-12T14:20:00Z'
        },
        {
          id: 3,
          title: 'Docker 容器化部署从入门到实践',
          content: '# Docker 容器化部署\n\n## Dockerfile 编写\n\n```dockerfile\nFROM openjdk:17\n...',
          summary: '从零开始学习 Docker，掌握容器化部署的核心技能，提升开发和运维效率。',
          coverImage: 'https://picsum.photos/id/3/400/240',
          categoryId: 3,
          categoryName: '运维笔记',
          tags: ['Docker', 'DevOps', '容器'],
          status: 'published',
          viewCount: 567,
          commentCount: 8,
          createdAt: '2026-05-10T09:15:00Z',
          updatedAt: '2026-05-10T09:15:00Z'
        },
        {
          id: 4,
          title: 'TypeScript 高级类型技巧',
          content: '# TypeScript 高级类型\n\n## 泛型约束\n\n泛型可以让我们创建可重用的组件...',
          summary: '深入 TypeScript 高级类型系统，掌握泛型、条件类型、映射类型等高级特性。',
          coverImage: 'https://picsum.photos/id/4/400/240',
          categoryId: 1,
          categoryName: '前端开发',
          tags: ['TypeScript', '前端'],
          status: 'published',
          viewCount: 734,
          commentCount: 15,
          createdAt: '2026-05-08T16:45:00Z',
          updatedAt: '2026-05-08T16:45:00Z'
        },
        {
          id: 5,
          title: 'MySQL 性能优化实战',
          content: '# MySQL 性能优化\n\n## 索引优化\n\n合理的索引设计是查询优化的基础...',
          summary: '分享 MySQL 数据库性能优化的实战经验，包括索引设计、SQL 优化、配置调优等。',
          coverImage: '',
          categoryId: 3,
          categoryName: '运维笔记',
          tags: ['MySQL', '数据库', '性能优化'],
          status: 'draft',
          viewCount: 0,
          commentCount: 0,
          createdAt: '2026-05-18T11:20:00Z',
          updatedAt: '2026-05-18T11:20:00Z'
        },
        {
          id: 6,
          title: '微服务架构设计模式',
          content: '# 微服务架构设计模式\n\n## 服务发现\n\n在微服务架构中，服务实例的位置是动态变化的...',
          summary: '深入探讨微服务架构的常见设计模式，包括服务发现、配置管理、断路器、API 网关等。',
          coverImage: 'https://picsum.photos/id/6/400/240',
          categoryId: 2,
          categoryName: '后端架构',
          tags: ['微服务', '架构', '设计模式'],
          status: 'draft',
          viewCount: 0,
          commentCount: 0,
          createdAt: '2026-05-20T08:30:00Z',
          updatedAt: '2026-05-20T08:30:00Z'
        }
      ]
      saveData()
    }

    const storedCategories = localStorage.getItem('blog_categories')
    if (storedCategories) {
      categories.value = JSON.parse(storedCategories)
    } else {
      categories.value = [
        { id: 1, name: '前端开发', slug: 'frontend' },
        { id: 2, name: '后端架构', slug: 'backend' },
        { id: 3, name: '运维笔记', slug: 'devops' },
        { id: 4, name: 'AI 技术', slug: 'ai' }
      ]
      localStorage.setItem('blog_categories', JSON.stringify(categories.value))
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

const saveData = () => {
  localStorage.setItem('flat_admin_posts', JSON.stringify(articles.value))
  window.dispatchEvent(new Event('storageUpdate'))
}

const stripMarkdown = (markdown) => {
  if (!markdown) return ''
  return markdown.replace(/[#*`>~\[\]()_+\-=[\]{}|\\]/g, '').replace(/\n/g, ' ').trim()
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const handleSearch = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  searchKeyword.value = ''
  filterStatus.value = ''
  filterCategory.value = ''
  dateRange.value = null
  currentPage.value = 1
}

const filterByCategory = (categoryId) => {
  filterCategory.value = categoryId
  currentPage.value = 1
}

const filterByTag = (tag) => {
  searchKeyword.value = tag
  currentPage.value = 1
}

const createArticle = () => {
  router.push('/article/edit/new')
}

const viewArticle = (id) => {
  const article = articles.value.find(a => a.id === id)
  if (article) {
    previewArticle.value = article
    previewHtml.value = md.render(article.content || '暂无内容')
    previewVisible.value = true
  }
}

const editArticle = (id) => {
  router.push(`/article/edit/${id}`)
}

const deleteArticle = async (id) => {
  try {
    await ElMessageBox.confirm('确定删除这篇文章吗？删除后无法恢复。', '删除确认', {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
    articles.value = articles.value.filter(a => a.id !== id)
    selectedIds.value = selectedIds.value.filter(sid => sid !== id)
    saveData()
    ElMessage.success('文章已删除')
  } catch {
    // 取消删除
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return
  try {
    await ElMessageBox.confirm(
        `确定删除选中的 ${selectedIds.value.length} 篇文章吗？删除后无法恢复。`,
        '批量删除确认',
        { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'warning' }
    )
    articles.value = articles.value.filter(a => !selectedIds.value.includes(a.id))
    selectedIds.value = []
    saveData()
    ElMessage.success('已删除选中文章')
  } catch {
    // 取消删除
  }
}

const handleSelectChange = () => {
  // 选择变化时的处理
}

const handleSizeChange = () => {
  currentPage.value = 1
}

const handlePageChange = () => {
  // 页码变化，自动刷新
}

watch(filteredArticles, () => {
  currentPage.value = 1
})

onMounted(() => {
  loadData()
  window.addEventListener('storageUpdate', loadData)
})
</script>

<style scoped>
.article-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--admin-bg-page);
  padding: 20px;
}

/* 统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--admin-bg-card);
  border-radius: 16px;
  border: 1px solid var(--admin-border);
  padding: 16px 20px;
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
  color: var(--admin-text);
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: var(--admin-text-muted);
  margin-top: 4px;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-left {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-right {
  display: flex;
  gap: 12px;
}

/* 文章网格 */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  flex: 1;
  margin-bottom: 24px;
}

.article-card {
  background: var(--admin-bg-card);
  border-radius: 16px;
  border: 1px solid var(--admin-border);
  overflow: hidden;
  transition: all 0.2s;
  position: relative;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.article-card.is-draft {
  border-left: 4px solid #F59E0B;
}

/* 封面图 */
.card-cover {
  height: 180px;
  background: var(--admin-bg-card-alt);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-cover img {
  transform: scale(1.05);
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--admin-bg-card-alt);
}

.cover-placeholder i {
  font-size: 48px;
  color: var(--admin-empty-icon);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.card-cover:hover .cover-overlay {
  opacity: 1;
}

.view-detail {
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 30px;
  cursor: pointer;
}

/* 卡片内容 */
.card-content {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-category {
  cursor: pointer;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 12px;
  line-height: 1.4;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-title:hover {
  color: var(--admin-accent);
}

.card-summary {
  font-size: 13px;
  color: var(--admin-text-muted);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-item {
  cursor: pointer;
}

.more-tags {
  font-size: 12px;
  color: var(--admin-text-muted);
  padding: 2px 8px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--admin-tag-footer-border);
}

.footer-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.status-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.status-badge i {
  font-size: 10px;
}

.status-badge.published {
  background: #ECFDF5;
  color: #10B981;
}

.status-badge.draft {
  background: #FEF3C7;
  color: #F59E0B;
}

.view-count, .comment-count {
  font-size: 12px;
  color: var(--admin-text-sub);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.footer-time {
  font-size: 12px;
  color: var(--admin-text-sub);
}

/* 勾选框 */
.card-checkbox {
  position: absolute;
  top: 12px;
  left: 12px;
  background: transparent;
  padding: 4px;
  border-radius: 8px;
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: var(--admin-bg-card);
  border-radius: 16px;
  border: 1px solid var(--admin-border);
}

.empty-state i {
  font-size: 64px;
  color: var(--admin-empty-icon);
  margin-bottom: 16px;
}

.empty-state p {
  color: var(--admin-text-muted);
  margin-bottom: 16px;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}

/* 预览对话框 */
.preview-content {
  max-height: 70vh;
  overflow-y: auto;
}

.preview-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--admin-text);
  margin-bottom: 16px;
}

.preview-meta {
  display: flex;
  gap: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--admin-tag-footer-border);
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--admin-text-muted);
}

.preview-meta i {
  margin-right: 6px;
}

.preview-body {
  font-size: 14px;
  line-height: 1.8;
}

/* 响应式 */
@media (max-width: 900px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .article-list {
    padding: 12px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-left {
    flex-wrap: wrap;
  }

  .filter-left .el-input,
  .filter-left .el-select,
  .filter-left .el-date-picker {
    width: 100% !important;
  }
}
</style>