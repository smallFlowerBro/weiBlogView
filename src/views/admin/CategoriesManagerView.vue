<template>
  <div class="category-manager">
    <!-- 搜索和操作栏 -->
    <div class="action-bar">
      <div class="search-area">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索分类名称或缩略名"
          clearable
          style="width: 260px"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <i class="fas fa-search"></i>
          </template>
        </el-input>
        <el-button @click="handleSearch">
          <i class="fas fa-search"></i> 搜索
        </el-button>
        <el-button @click="resetSearch" v-if="searchKeyword">
          <i class="fas fa-redo"></i> 重置
        </el-button>
      </div>
      <div class="action-area">
        <el-button type="primary" @click="openCreateDialog">
          <i class="fas fa-plus"></i> 新建分类
        </el-button>
        <el-button @click="handleBatchDelete" :disabled="selectedIds.length === 0">
          <i class="fas fa-trash-alt"></i> 批量删除
        </el-button>
      </div>
    </div>

    <!-- 分类列表表格 -->
    <el-table
      :data="filteredCategories"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="ID" width="80" align="center" sortable />
      <el-table-column prop="name" label="分类名称" min-width="150">
        <template #default="{ row }">
          <div class="category-name">
            <span class="name-text">{{ row.name }}</span>
            <el-tag v-if="row.default" size="small" type="success" effect="plain">默认</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="slug" label="缩略名" min-width="150">
        <template #default="{ row }">
          <code class="slug-text">{{ row.slug }}</code>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
      <el-table-column prop="sort_order" label="排序" width="100" align="center" sortable>
        <template #default="{ row }">
          <div class="sort-control">
            <span class="sort-value">{{ row.sortOrder }}</span>
            <div class="sort-actions">
              <el-button
                size="small"
                text
                @click="changeSort(row, 'up')"
                :disabled="row.sortOrder <= 0"
              >
                <i class="fas fa-chevron-up"></i>
              </el-button>
              <el-button
                size="small"
                text
                @click="changeSort(row, 'down')"
                :disabled="row.sortOrder >= maxSortOrder"
              >
                <i class="fas fa-chevron-down"></i>
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#10B981"
            inactive-color="#9CA3AF"
            @change="handleStatusChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180" sortable>
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="openEditDialog(row)"
            :disabled="row.default && row.id === 1"
          >
            <i class="fas fa-edit"></i> 编辑
          </el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="handleDelete(row)"
            :disabled="row.default && row.id === 1"
          >
            <i class="fas fa-trash-alt"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-config-provider :locale="zhCn">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
      </el-config-provider>
    </div>

    <!-- 新建/编辑分类对话框 -->
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
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入分类名称"
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
        <el-form-item label="分类描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="3"
            placeholder="请输入分类描述（可选）"
            :maxlength="255"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="排序权重" prop="sort_order">
          <el-input-number
            v-model="formData.sortOrder"
            :min="0"
            :max="9999"
            placeholder="数字越小越靠前"
          />
          <div class="form-tip">数值越小，显示位置越靠前</div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">
          {{ editingId ? '保存修改' : '创建分类' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {zhCn} from "element-plus/es/locale/index";
import {createCategory, queryCategoryList, updateCategory,deleteCategory,batchDeleteCategory,swapSortOrder} from "@/api/admin/categories.js";

// 数据状态
const categories = ref([])
const loading = ref(false)
const submitting = ref(false)
const searchKeyword = ref('')
const selectedIds = ref([])
const currentPage = ref(1)
const pageSize = ref(20)

// 对话框状态
const dialogVisible = ref(false)
const editingId = ref(null)
const formRef = ref(null)

// 表单数据
const formData = ref({
  name: '',
  slug: '',
  description: '',
  sort_order: 0,
  status: 1
})

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && value.trim() !== value) {
          callback(new Error('分类名称不能包含首尾空格'))
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
        if (value && value.startsWith('-') || value.endsWith('-')) {
          callback(new Error('缩略名不能以连字符开头或结尾'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  sortOrder: [
    { type: 'number', required: true, message: '请输入排序权重', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => editingId.value ? '编辑分类' : '新建分类')

const maxSortOrder = computed(() => {
  if (categories.value.length === 0) return 0
  return Math.max(...categories.value.map(c => c.sortOrder))
})

const filteredCategories = computed(() => {
  let list = [...categories.value]

  // 搜索过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.slug.toLowerCase().includes(keyword)
    )
  }

  // 按排序权重排序
  list.sort((a, b) => a.sortOrder - b.sortOrder)

  return list
})

const total = computed(() => filteredCategories.value.length)

// 分页后的数据
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCategories.value.slice(start, end)
})

// 将分页数据绑定到表格
watch(paginatedCategories, (newVal) => {
  // 这里用于更新表格显示
}, { immediate: true })

// 注意：模板中直接使用 filteredCategories 需要分页
// 为了分页，修改模板中的 :data 为 paginatedCategories
// 但为了保持响应式，我们在模板中稍作调整

// 方法
const loadCategories = () => {
  loading.value = true
  try {
    queryCategoryList({}).then((result)=>{
        categories.value = result.details
    },(error)=>{
      ElMessage.error(error.msg||'加载分类数据失败')
    })
  } catch (error) {
    ElMessage.error('加载分类数据失败')
  } finally {
    loading.value = false
  }
}

const saveCategories = () => {
  localStorage.setItem('blog_categories', JSON.stringify(categories.value))
  window.dispatchEvent(new Event('storageUpdate'))
}

const handleSearch = () => {
  currentPage.value = 1
}

const resetSearch = () => {
  searchKeyword.value = ''
  currentPage.value = 1
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleStatusChange = async (row) => {
  try {
    const index = categories.value.findIndex(c => c.id === row.id)
    if (index !== -1) {
      console.log(row)
      let res = await editCategory({
        id:row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        sortOrder: row.sortOrder,
        status: row.status
      })

      if(res){
        // ElMessage.success(`已${res.status == 1 ? '启用' : '禁用'}分类「${row.name}」`)
        categories.value[index] = res
      }else{
        ElMessage.error('操作失败')
      }
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}

const changeSort = (row, direction) => {
  const currentIndex = categories.value.findIndex(c => c.id === row.id)
  if (currentIndex === -1) return

  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
  if (targetIndex < 0 || targetIndex >= categories.value.length) return

  // 交换排序值
  const currentSort = row.sortOrder
  const targetSort = categories.value[targetIndex].sortOrder

  swapSortOrder({id1:row.id,id2:categories.value[targetIndex].id})
      .then((result)=>{
        categories.value[currentIndex].sortOrder = targetSort
        categories.value[targetIndex].sortOrder = currentSort
        // 重新排序
        categories.value.sort((a, b) => a.sortOrder - b.sortOrder)
        ElMessage.success('排序已更新')
      },(error)=>{
        ElMessage.error(error.msg||'操作失败')
      })


}

const generateSlug = () => {
  if (!formData.value.slug && formData.value.name) {
    // 自动生成缩略名：中文转拼音简化处理，实际项目中可调用拼音库
    let slug = formData.value.name
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50)

    // 简单的中文转拼音映射（仅示例，实际应使用 pinyin 库）
    // 这里简单处理：保留原样，用户可手动编辑
    formData.value.slug = slug
  }
}

const openCreateDialog = () => {
  editingId.value = null
  formData.value = {
    name: '',
    slug: '',
    description: '',
    sortOrder: categories.value.length,
    status: 1
  }
  dialogVisible.value = true
}

const openEditDialog = (row) => {
  editingId.value = row.id
  formData.value = {
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    sortOrder: row.sortOrder,
    status: row.status
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
      const nameExists = categories.value.some(c =>
        c.name === formData.value.name && c.id !== editingId.value
      )
      if (nameExists) {
        ElMessage.error('分类名称已存在')
        submitting.value = false
        return
      }

      // 检查缩略名唯一性
      const slugExists = categories.value.some(c =>
        c.slug === formData.value.slug && c.id !== editingId.value
      )
      if (slugExists) {
        ElMessage.error('缩略名已存在')
        submitting.value = false
        return
      }

      const now = new Date().toISOString()

      if (editingId.value) {
        // 编辑分类
        const index = categories.value.findIndex(c => c.id === editingId.value)
        if (index !== -1) {
          let res = await editCategory({
            id:editingId.value,
            name: formData.value.name,
            slug: formData.value.slug,
            description: formData.value.description,
            sortOrder: formData.value.sortOrder,
            status: formData.value.status,
          })
          if(res){
            categories.value[index] = res
          }
        }
      } else {
        let res = await createNewCategory({
          name: formData.value.name,
          slug: formData.value.slug,
          description: formData.value.description,
          sortOrder: formData.value.sortOrder,
          status: formData.value.status,
        })

      }

      // 重新排序
      categories.value.sort((a, b) => a.sortOrder - b.sortOrder)
      dialogVisible.value = false
      closeDialog()
    } catch (error) {
      ElMessage.error('操作失败')
    } finally {
      submitting.value = false
    }
  })
}
//保存分类修改
const editCategory = async function(category){
  return await updateCategory(category).then((result) => {
    ElMessage.success("更新成功")
    return result.categoryInfos
  }, (error) => {
    ElMessage.error(error.msg || "更新分类失败")
    return false
  })
}
// 创建新得分类
const createNewCategory = async function (category) {
  return await createCategory(category).then((result) => {
    categories.value.push(result.categoryInfos);
    ElMessage.success("创建成功")
    return true
  }, (error) => {
    ElMessage.error(error.msg || "新建分类失败")
    return false
  })
}
const handleDelete = async (row) => {
  if (row.default && row.id === 1) {
    ElMessage.warning('默认分类不能删除')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除分类「${row.name}」吗？删除后，该分类下的文章将变为「未分类」。`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const index = categories.value.findIndex(c => c.id === row.id)

    deleteCategory({id:row.id}).then((retult)=>{
      ElMessage.success('已删除分类')
      categories.value.splice(index, 1)
    },(error)=>{
      ElMessage.error(error.msg||"分类删除失败")
    })
  } catch {
    // 用户取消删除
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return

  // 检查是否包含默认分类
  if (selectedIds.value.includes(1)) {
    ElMessage.warning('默认分类不能删除，请取消选中')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedIds.value.length} 个分类吗？`,
      '批量删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    batchDeleteCategory({ids:selectedIds.value.join(",")})
        .then((result)=>{
          categories.value = categories.value.filter(c => !selectedIds.value.includes(c.id))
          selectedIds.value = []
          ElMessage.success('已删除选中分类')
        },(error)=>{
          ElMessage.error(error.msg||"分类删除失败")
        })


  } catch {
    // 用户取消删除
  }
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
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
.category-manager {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--admin-bg-page);
  padding: 20px;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

/* 表格样式 */
:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: var(--admin-bg-card-alt);
  color: var(--admin-text);
  font-weight: 600;
}

.category-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 500;
}

.slug-text {
  background: var(--admin-slug-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: var(--admin-accent);
}

.sort-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sort-value {
  font-weight: 500;
  min-width: 30px;
  text-align: center;
}

.sort-actions {
  display: flex;
  gap: 4px;
}

.sort-actions .el-button {
  padding: 4px;
}

/* 分页 */
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 表单提示 */
.form-tip {
  font-size: 12px;
  color: var(--admin-text-sub);
  margin-top: 4px;
}

/* 响应式 */
@media (max-width: 768px) {
  .category-manager {
    padding: 12px;
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

  :deep(.el-table) {
    font-size: 12px;
  }

  :deep(.el-table .cell) {
    padding: 8px 6px;
  }
}
</style>