<template>
  <div class="tech-line"></div>
  <div class="tech-line2"></div>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo" @click="clickLogo">
        <div class="logo-icon"><i class="fas fa-code-branch"></i></div>
        <div class="logo-text">WeiBlog<span class="logo-badge">Tech</span></div>
      </div>

      <div class="nav-menu">
        <router-link to="home">首页</router-link>
        <router-link to="articles">文章</router-link>
        <router-link to="idea">灵感库</router-link>
        <router-link to="travelNote">旅行</router-link>
        <router-link to="about">关于</router-link>
        <button class="theme-toggle" id="themeToggle" @click.prevent="changeSkin"><i class="fas" :class="skinIcon"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 头部导航 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(43, 110, 240, 0.2);
  transition: all 0.2s;
}

body.dark .site-header {
  background: rgba(17, 25, 39, 0.85);
  border-bottom-color: rgba(95, 158, 255, 0.3);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.logo:hover{
  cursor: pointer;
}

.logo-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(145deg, var(--tech-blue), #1a4fcf);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px var(--tech-glow);
  position: relative;
  overflow: hidden;
}

.logo-icon i {
  font-size: 1.5rem;
  color: white;
  z-index: 2;
}

.logo-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(125deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
}

.logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--tech-blue), #0f3c9e);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.logo-badge {
  font-size: 0.7rem;
  background: var(--bg-soft);
  padding: 0.2rem 0.5rem;
  border-radius: 30px;
  color: var(--tech-blue);
  margin-left: 0.3rem;
  font-weight: 500;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-menu a {
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.2s;
}

.nav-menu a:hover {
  color: var(--tech-blue);
}

.theme-toggle {
  background: var(--bg-soft);
  border: none;
  border-radius: 40px;
  width: 2.3rem;
  height: 2.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--tech-blue);
  transition: 0.2s;
}

.theme-toggle:hover {
  background: var(--tech-blue);
  color: white;
  transform: scale(0.96);
}

</style>
<script setup>
import {onMounted, ref} from 'vue';
import {useRouter,useRoute} from "vue-router";
// 声明变量
// 模式转换的而央视
let skinIcon = ref("fa-moon");
// 路由实例
let router = useRouter();
//初始化
const init = () => {
  // 当前样式
  let storedTheme = localStorage.getItem('lightvue-theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark');
    skinIcon.value = "fa-sun"
  } else {
    document.body.classList.remove('dark');
    skinIcon.value = "fa-moon";
  }
}
// 修改当前皮肤
const changeSkin = function () {
  if (document.body.classList.contains('dark')) {
    skinIcon.value = "fa-moon";
    document.body.classList.remove('dark');
    localStorage.setItem('lightvue-theme', 'light');
  } else {
    skinIcon.value = "fa-sun"
    document.body.classList.add('dark');
    localStorage.setItem('lightvue-theme', 'dark');
  }
}

//点击logo
const clickLogo = ()=>{
    router.push("home")
}
onMounted(() => {
  //初始化
  init();
})
</script>
