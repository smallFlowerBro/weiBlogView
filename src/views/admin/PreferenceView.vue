<template>
  <div class="preferences-page">
    <div class="page-header">
      <h2><i class="fas fa-cog"></i> 偏好设置</h2>
      <p class="page-desc">配置系统参数、上传路径、外观主题等个性化选项</p>
    </div>

    <div class="preferences-container">
      <el-tabs v-model="activeTab" class="prefs-tabs">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name">
          <template #label>
            <span><i :class="tab.icon"></i> {{ tab.label }}</span>
          </template>
          <component :is="tab.component" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BasicSettingsPanel    from '@/components/admin/preference/BasicSettingsPanel.vue'
import UploadSettingsPanel   from '@/components/admin/preference/UploadSettingsPanel.vue'
import StorageSettingsPanel  from '@/components/admin/preference/StorageSettingsPanel.vue'
import ThemeSettingsPanel    from '@/components/admin/preference/ThemeSettingsPanel.vue'
import EmailSettingsPanel    from '@/components/admin/preference/EmailSettingsPanel.vue'
import BackupSettingsPanel   from '@/components/admin/preference/BackupSettingsPanel.vue'
import SecuritySettingsPanel from '@/components/admin/preference/SecuritySettingsPanel.vue'

const activeTab = ref('basic')

const tabs = [
  { name: 'basic',    label: '基础设置', icon: 'fas fa-globe',          component: BasicSettingsPanel    },
  { name: 'upload',   label: '上传设置', icon: 'fas fa-cloud-upload-alt',component: UploadSettingsPanel   },
  { name: 'storage',  label: '存储设置', icon: 'fas fa-database',        component: StorageSettingsPanel  },
  { name: 'theme',    label: '主题外观', icon: 'fas fa-palette',         component: ThemeSettingsPanel    },
  { name: 'email',    label: '邮件设置', icon: 'fas fa-envelope',        component: EmailSettingsPanel    },
  { name: 'backup',   label: '备份设置', icon: 'fas fa-database',        component: BackupSettingsPanel   },
  { name: 'security', label: '安全设置', icon: 'fas fa-shield-alt',      component: SecuritySettingsPanel },
]
</script>

<style scoped>
.preferences-page {
  height: 100%;
  background: var(--admin-bg-page);
  padding: 24px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 8px;
}

.page-header h2 i {
  margin-right: 10px;
  color: var(--admin-accent);
}

.page-desc {
  color: var(--admin-text-muted);
  font-size: 14px;
}

.preferences-container {
  background: var(--admin-bg-card);
  border-radius: 16px;
  border: 1px solid var(--admin-border);
  overflow: hidden;
}

.prefs-tabs {
  padding: 0 20px;
}

.prefs-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 16px 0 0 0;
  border-bottom: 1px solid var(--admin-border);
}

.prefs-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  color: var(--admin-tabs-item);
}

.prefs-tabs :deep(.el-tabs__item i) {
  margin-right: 6px;
}

.prefs-tabs :deep(.el-tabs__item.is-active) {
  color: var(--admin-tabs-active);
}

.prefs-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--admin-tabs-active);
}

/* 响应式 */
@media (max-width: 768px) {
  .preferences-page {
    padding: 12px;
  }

  .prefs-tabs :deep(.el-tabs__item) {
    padding: 0 12px;
    font-size: 12px;
  }
}
</style>
