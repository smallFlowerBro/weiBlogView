<template>
  <el-tabs
      v-model="menuAndTab.activeTabName"
      type="card"
      class="custom-tabs"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      closable
  >
    <el-tab-pane
        v-for="tab in menuAndTab.openedTabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
    >
      <template #label>
        <span><i :class="tab.icon"></i> {{ tab.label }}</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import {menuAndTabStore} from "@/store/menuAndTabStore.js";

let menuAndTab = menuAndTabStore();

// 关闭标签页
const handleTabRemove = (tabName) => {
  const idx = menuAndTab.openedTabs.findIndex(t => t.name === tabName)
  if (idx === -1) return
  const wasActive = menuAndTab.activeTabName === tabName
  menuAndTab.openedTabs.splice(idx, 1)
  console.log(wasActive)
  if (menuAndTab.openedTabs.length === 0) {
    menuAndTab.openPage('dashboard')
  } else if (wasActive) {
    const newActiveIdx = Math.min(idx, menuAndTab.openedTabs.length - 1)
    menuAndTab.activeTabName = menuAndTab.openedTabs[newActiveIdx].name
    menuAndTab.activeMenu = menuAndTab.openedTabs[newActiveIdx].pageId
    menuAndTab.openPage(menuAndTab.activeMenu)
  }
}

// 点击标签页切换
const handleTabClick = (tab) => {
  menuAndTab.activeTabName = tab.paneName
  const tabData = menuAndTab.openedTabs.find(t => t.name === tab.paneName)
  if (tabData) {
    menuAndTab.activeMenu = tabData.pageId
  }
  menuAndTab.openPage(menuAndTab.activeMenu);
}
</script>
<style scoped>

</style>