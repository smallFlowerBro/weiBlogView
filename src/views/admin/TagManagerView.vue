<template>
  <div class="tag-manager">
    <!-- 搜索和操作栏 -->
    <div class="action-bar">
      <div class="search-area">
        <el-input v-model="searchKeyword"
            placeholder="搜索标签名称或缩略名"
            clearable
            style="width: 260px"
            @keyup.enter="handleSearch"
        >
          <template #prefix><i class="fas fa-search"></i></template>
        </el-input>
        <el-button type="primary" @click="handleSearch">
          <i class="fas fa-search"></i> 搜索
        </el-button>
        <el-button @click="resetSearch" v-if="searchKeyword">
          <i class="fas fa-redo"></i> 重置
        </el-button>
      </div>
      <div class="action-area">
        <el-button type="primary" @click="openCreateDialog">
          <i class="fas fa-plus"></i> 新建标签
        </el-button>
        <el-button @click="handleBatchDelete" :disabled="selectedIds.length === 0">
          <i class="fas fa-trash-alt"></i> 批量删除
        </el-button>
      </div>
    </div>

    <!-- 标签统计卡片 -->
    <div class="stats-cards">
      <el-card class="stat-card" shadow="never">
        <div class="stat-content">
          <div class="stat-icon">
            <i class="fas fa-tags"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ totalTags }}</div>
            <div class="stat-label">总标签数</div>
          </div>
        </div>
      </el-card>
      <el-card class="stat-card" shadow="never">
        <div class="stat-content">
          <div class="stat-icon" style="background: #EFF6FF;">
            <i class="fas fa-eye" style="color: #3B82F6;"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ activeTags }}</div>
            <div class="stat-label">使用中标签</div>
          </div>
        </div>
      </el-card>
      <el-card class="stat-card" shadow="never">
        <div class="stat-content">
          <div class="stat-icon" style="background: #FEF3C7;">
            <i class="fas fa-clock" style="color: #F59E0B;"></i>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ recentTags }}</div>
            <div class="stat-label">近7天新增</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 标签列表 - 卡片网格布局 -->
    <div class="tags-grid" v-loading="loading">
      <div
          v-for="tag in paginatedTags"
          :key="tag.id"
          class="tag-card"
          :style="{ borderTopColor: tag.color }"
          @click="toggleTag(tag.id)"
          :class="{'active':selectedIds.includes(tag.id)}"


      >
        <div class="tag-header">
          <span class="tag-name" :style="{ color: tag.color }">
            <i class="fas fa-hashtag"></i> {{ tag.name }}
          </span>
          <div class="tag-actions">
            <el-button
                link
                type="primary"
                size="small"
                @click="openEditDialog(tag)"
            >
              <i class="fas fa-edit"></i>
            </el-button>
            <el-button
                link
                type="danger"
                size="small"
                @click="handleDelete(tag)"
            >
              <i class="fas fa-trash-alt"></i>
            </el-button>
          </div>
        </div>
        <div class="tag-slug">
          <code class="slug-code">{{ tag.slug }}</code>
        </div>
        <div class="tag-description" v-if="tag.description">
          {{ tag.description }}
        </div>
        <div class="tag-description empty-description" v-else >
          暂无描述
        </div>
        <div class="tag-footer">
          <div class="tag-color-preview">
            <span class="color-dot" :style="{ backgroundColor: tag.color }"></span>
            <span class="color-value">{{ tag.color }}</span>
          </div>
          <div class="tag-time">
            <i class="fas fa-calendar-alt"></i>
            {{ formatDate(tag.createdAt) }}
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTags.length === 0 && !loading" class="empty-state">
        <i class="fas fa-tags"></i>
        <p>暂无标签数据</p>
        <el-button type="primary" @click="openCreateDialog">创建第一个标签</el-button>
      </div>
    </div>

    <!-- 分页 -->
    <el-config-provider :locale="zhCn">
    <div class="pagination-wrapper" v-if="filteredTags.length > 0">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 48, 96]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      />
    </div></el-config-provider>

    <!-- 新建/编辑标签对话框 -->
    <el-dialog
        v-model="dialogVisible"
        :title="dialogTitle"
        width="500px"
        @close="closeDialog"
    >
      <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="80px"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input
              v-model="formData.name"
              placeholder="请输入标签名称"
              @input="generateSlug"
          />
        </el-form-item>
        <el-form-item label="缩略名" prop="slug">
          <el-input
              v-model="formData.slug"
              placeholder="用于URL的英文标识"
          />
          <div class="form-tip">建议使用英文小写字母、数字和连字符</div>
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input
              v-model="formData.description"
              type="textarea"
              :rows="3"
              placeholder="请输入标签描述（可选）"
              :maxlength="255"
              show-word-limit
          />
        </el-form-item>
        <el-form-item label="标签颜色" prop="color">
          <div class="color-selector">
            <el-color-picker
                v-model="formData.color"
                show-alpha
                :predefine="predefineColors"
            />
            <el-input
                v-model="formData.color"
                placeholder="#409EFF"
                style="width: 120px; margin-left: 12px;"
                @input="validateColor"
            />
          </div>
          <div class="form-tip">选择或输入颜色代码，用于标签显示</div>
        </el-form-item>
        <el-form-item label="预览效果">
          <el-tag :color="formData.color" effect="dark" style="color: white;">
            {{ formData.name || '标签预览' }}
          </el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">
          {{ editingId ? '保存修改' : '创建标签' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {zhCn} from "element-plus/es/locale/index";
import {wb2db_q_tags_list} from "@/api/admin/tags.js";


// 数据状态
const tags = ref([])          //标签列表
const loading = ref(false)    //加载中
const submitting = ref(false) //提交中
const searchKeyword = ref('') //关键词
const selectedIds = ref([])   //选中的标签
const currentPage = ref(1)    //当前页
const pageSize = ref(24)      //页面大小

// 对话框状态
const dialogVisible = ref(false)   //对话框是否可用
const editingId = ref(null)        //是否可编辑
const formRef = ref(null)

// 预定义颜色
const predefineColors = [
  '#409EFF', '#67C23A', '#E6A23C', '#F56C6C',
  '#909399', '#00B4D8', '#FF6B6B', '#845EC2',
  '#FF9671', '#00C9A7', '#C34A36', '#4B4453'
]

// 表单数据
const formData = ref({
  name: '',
  slug: '',
  description: '',
  color: '#409EFF'
})

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && value.trim() !== value) {
          callback(new Error('标签名称不能包含首尾空格'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  slug: [
    { required: true, message: '请输入缩略名', trigger: 'blur' },
    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
    {
      pattern: /^[a-z0-9-]+$/,
      message: '缩略名只能包含小写字母、数字和连字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value && (value.startsWith('-') || value.endsWith('-'))) {
          callback(new Error('缩略名不能以连字符开头或结尾'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  color: [
    { required: true, message: '请选择标签颜色', trigger: 'blur' },
    {
      pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      message: '请输入有效的颜色代码（如 #409EFF）',
      trigger: 'blur'
    }
  ]
}

// 计算属性
const dialogTitle = computed(() => editingId.value ? '编辑标签' : '新建标签')

const filteredTags = computed(() => {
  let list = [...tags.value]

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.slug.toLowerCase().includes(keyword)
    )
  }

  // 按创建时间倒序排序
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return list
})

const totalTags = computed(() => tags.value.length)
const activeTags = computed(() => tags.value.length) // 所有标签都是使用中的
const recentTags = computed(() => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return tags.value.filter(t => new Date(t.createdAt) > sevenDaysAgo).length
})

const total = computed(() => filteredTags.value.length)

const paginatedTags = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredTags.value.slice(start, end)
})

// 方法

// 根据关键词查询的 标签列表 传空字符 查全部
const loadTags = (keyword)=>{

  wb2db_q_tags_list({"keyword":keyword}).then((result)=>{
    tags.value = result.detail
  },(error)=>{
    ElMessage.error("出现异常")
  }).finally(()=>{
    loading.value=false
  })
}


//选中tag
const toggleTag = (tag_id)=>{

  if(selectedIds.value.includes(tag_id)){
    selectedIds.value = selectedIds.value.filter((tag)=>tag != tag_id);
  }else{
    selectedIds.value.push(tag_id);
  }

}

const saveTags = () => {
  localStorage.setItem('blog_tags', JSON.stringify(tags.value))
  window.dispatchEvent(new Event('storageUpdate'))
}

const handleSearch = () => {
  currentPage.value = 1
}

const resetSearch = () => {
  searchKeyword.value = ''
  currentPage.value = 1
}

const generateSlug = () => {
  if (!formData.value.slug && formData.value.name) {
    let slug = formData.value.name
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 50)

    // 简单的中文转拼音映射（示例），实际应使用 pinyin 库
    const pinyinMap = {
      '前端': 'frontend',
      '后端': 'backend',
      '运维': 'devops',
      '数据库': 'database'
    }
    for (const [cn, en] of Object.entries(pinyinMap)) {
      if (slug.includes(cn)) {
        slug = slug.replace(cn, en)
      }
    }
    formData.value.slug = slug
  }
}

const validateColor = (value) => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!colorRegex.test(value) && value !== '') {
    ElMessage.warning('颜色格式不正确，请使用 #RRGGBB 格式')
  }
}

const openCreateDialog = () => {
  editingId.value = null
  formData.value = {
    name: '',
    slug: '',
    description: '',
    color: '#409EFF'
  }
  dialogVisible.value = true
}

const openEditDialog = (row) => {
  editingId.value = row.id
  formData.value = {
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    color: row.color || '#409EFF'
  }
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  editingId.value = null
  formRef.value?.resetFields()
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitting.value = true
    try {
      // 检查名称唯一性
      const nameExists = tags.value.some(t =>
          t.name === formData.value.name && t.id !== editingId.value
      )
      if (nameExists) {
        ElMessage.error('标签名称已存在')
        submitting.value = false
        return
      }

      // 检查缩略名唯一性
      const slugExists = tags.value.some(t =>
          t.slug === formData.value.slug && t.id !== editingId.value
      )
      if (slugExists) {
        ElMessage.error('缩略名已存在')
        submitting.value = false
        return
      }

      const now = new Date().toISOString()

      if (editingId.value) {
        // 编辑标签
        const index = tags.value.findIndex(t => t.id === editingId.value)
        if (index !== -1) {
          tags.value[index] = {
            ...tags.value[index],
            name: formData.value.name,
            slug: formData.value.slug,
            description: formData.value.description,
            color: formData.value.color,
            updatedAt: now
          }
          ElMessage.success('标签修改成功')
        }
      } else {
        // 新建标签
        const newId = Math.max(...tags.value.map(t => t.id), 0) + 1
        tags.value.push({
          id: newId,
          name: formData.value.name,
          slug: formData.value.slug,
          description: formData.value.description,
          color: formData.value.color,
          createdAt: now,
          updatedAt: now
        })
        ElMessage.success('标签创建成功')
      }

      saveTags()
      dialogVisible.value = false
      closeDialog()
    } catch (error) {
      ElMessage.error('操作失败')
    } finally {
      submitting.value = false
    }
  })
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
        `确定要删除标签「${row.name}」吗？`,
        '删除确认',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )

    const index = tags.value.findIndex(t => t.id === row.id)
    if (index !== -1) {
      tags.value.splice(index, 1)
      saveTags()
      ElMessage.success('标签已删除')
    }
  } catch {
    // 用户取消删除
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return

  try {
    await ElMessageBox.confirm(
        `确定要删除选中的 ${selectedIds.value.length} 个标签吗？`,
        '批量删除确认',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )

    tags.value = tags.value.filter(t => !selectedIds.value.includes(t.id))
    saveTags()
    selectedIds.value = []
    ElMessage.success('已删除选中标签')
  } catch {
    // 用户取消删除
  }
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handlePageChange = (val) => {
  currentPage.value = val
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

onMounted(() => {
  loadTags("")
})
</script>

<style scoped>
.tag-manager {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F8FAFE;
  padding: 20px;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.search-area {
  display: flex;
  gap: 10px;
  align-items: center;
}

.action-area {
  display: flex;
  gap: 10px;
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background: #FFFFFF;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: #EFF6FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 24px;
  color: #3B82F6;
}

.stat-info {
  flex: 1;
}

.stat-value {
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

/* 标签卡片网格 */
.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.tags-grid div{
  cursor: pointer;
}
.tags-grid .tag-card.active{
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.tag-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  border-top-width: 4px;
  padding: 16px;
  transition: all 0.2s ease;
}

.tag-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tag-name {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag-name i {
  font-size: 16px;
}

.tag-actions {
  display: flex;
  gap: 4px;
}

.tag-slug {
  margin-bottom: 10px;
}

.slug-code {
  background: #F1F5F9;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  color: #475569;
}

.tag-description {
  color: #64748B;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 14px;
  min-height: 40px;
}

.empty-description {
  color: #9CA3AF;
  font-style: italic;
}

.tag-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #EDF2F7;
}

.tag-color-preview {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #E2E8F0;
}

.color-value {
  font-family: monospace;
  font-size: 12px;
  color: #64748B;
}

.tag-time {
  font-size: 12px;
  color: #9CA3AF;
}

.tag-time i {
  margin-right: 4px;
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}

.empty-state i {
  font-size: 64px;
  color: #CBD5E1;
  margin-bottom: 16px;
}

.empty-state p {
  color: #64748B;
  margin-bottom: 16px;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}

/* 颜色选择器样式 */
.color-selector {
  display: flex;
  align-items: center;
}

/* 表单提示 */
.form-tip {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

/* 暗色主题适配 */
body.dark-for-flat .tag-manager {
  background: #0F172A;
}

body.dark-for-flat .stat-card,
body.dark-for-flat .tag-card,
body.dark-for-flat .empty-state {
  background: #1E293B;
  border-color: #334155;
}

body.dark-for-flat .stat-value {
  color: #F1F5F9;
}

body.dark-for-flat .stat-label {
  color: #94A3B8;
}

body.dark-for-flat .slug-code {
  background: #2D3A4E;
  color: #94A3B8;
}

body.dark-for-flat .tag-description {
  color: #94A3B8;
}

body.dark-for-flat .tag-footer {
  border-color: #334155;
}

body.dark-for-flat .color-value {
  color: #94A3B8;
}

body.dark-for-flat .tag-time {
  color: #64748B;
}

body.dark-for-flat .empty-state i {
  color: #475569;
}

body.dark-for-flat .empty-state p {
  color: #94A3B8;
}

/* 响应式 */
@media (max-width: 768px) {
  .tag-manager {
    padding: 12px;
  }

  .stats-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .tags-grid {
    grid-template-columns: 1fr;
  }

  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-area {
    flex-wrap: wrap;
  }

  .search-area .el-input {
    flex: 1;
  }
}
</style>