<template>
  <!-- 轮播内容 开始  -->
  <section class="carousel-section">
    <div class="carousel-container">
      <div class="carousel-slides" id="carouselSlides">
        <el-skeleton :loading="slide_contents.is_loading">
        <Splide v-if="slide_contents.details.length>0"  :options="splideOptions" class="w-100 h-100">
          <!-- 循环渲染 Slide -->
          <SplideSlide class="w-100" v-for="(item, index) in slide_contents.details" :key="index">
            <div class="carousel-slide" :style="{'background-image': `linear-gradient(145deg,#b2d9ff,#d9eaff),url(${item.bg_url})`,'background-blend-mode': 'overlay' }" style="">
              <div class="slide-overlay">
                <div class="slide-content">
                  <h2>{{item.main_title }}</h2>
                  <p>{{item.sub_title}}</p>
                  <a href="#" class="slide-btn">{{item.more_btn }}<i class="fas " :class="item.more_btn_icon"></i></a>
                </div>
              </div>
            </div>
          </SplideSlide>
        </Splide>
        <div v-else>暂无数据</div>
          <template #template>
            <el-skeleton-item variant="image" style="width: 100%;height: 100%"/>
          </template>
        </el-skeleton>
      </div>
    </div>
  </section>
  <!-- 轮播内容 结束  -->

  <main>
    <div class="container">
      <div class="blog-layout">
        <div>
          <div class="section-header"><h2>最新·技术视野</h2>
            <router-link to="/articles">全部文章 <i class="fas fa-arrow-right"></i></router-link>
          </div>
          <el-skeleton :loading = "article_list.is_loading" >
          <div class="posts-grid">
            <article v-for="(item,index) in article_list.details"  class="post-card" :key="index">
              <img class="card-img" :src="item.background_image" :alt="item.category">
              <div class="card-content">
                <div class="post-meta"><span><i class="far fa-calendar-alt"></i>&nbsp;{{item.publish_date}}</span><span><i
                    class="far fa-clock"></i> {{item.read_time}}</span></div>
                <h3 class="post-title"><a href="#">{{item.main_title}}</a></h3>
                <p class="post-excerpt">{{item.sub_title}}</p>
                <router-link class="read-more" :to="{name:'Article',params:{id:index,key:index}}">阅读全文<i class="fas fa-arrow-right"></i></router-link>
              </div>
            </article>
          </div>
          <template #template>
            <el-skeleton-item variant="rect" style="width: 100%;height: 500px">
              <el-skeleton-item variant="image" class="w-100 h-40"></el-skeleton-item>
              <el-skeleton-item variant="text" class="w-100 h-60 "></el-skeleton-item>
            </el-skeleton-item>
          </template>
          </el-skeleton>
        </div>
        <aside class="sidebar">
          <div class="sidebar-card author-info">
            <div class="avatar"><i class="fas fa-microchip"></i></div>
            <div class="author-name">林星野</div>
            <div class="author-bio">全栈架构师 · Vue 生态贡献者。热爱前沿科技与优雅设计。</div>
            <div class="social-links"><a href="#"><i class="fab fa-github"></i></a><a href="#"><i
                class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-js"></i></a><a href="#"><i
                class="fas fa-envelope"></i></a></div>
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">📡 探索分类</div>
            <ul class="category-list">
              <li><a href="#">Vue 生态</a><span class="category-count">14</span></li>
              <li><a href="#">前端架构</a><span class="category-count">11</span></li>
              <li><a href="#">CSS 艺术</a><span class="category-count">9</span></li>
              <li><a href="#">开源贡献</a><span class="category-count">7</span></li>
              <li><a href="#">AI 编程</a><span class="category-count">5</span></li>
            </ul>
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">⚡ 科技标签</div>
            <div class="tag-cloud"><a href="#" class="tag">#Vue3</a><a href="#" class="tag">#Vite</a><a href="#"
                                                                                                        class="tag">#TypeScript</a><a
                href="#" class="tag">#Tailwind</a><a href="#" class="tag">#WebGPU</a><a href="#" class="tag">#Rust</a>
            </div>
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">✨ 灵感短语</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); font-style:italic;">“代码如诗，科技向善。轻量 · 响应
              · 未来”</p></div>
        </aside>
      </div>
    </div>
  </main>

</template>
<style lang="css" scoped>
/* 轮播图 */
.carousel-section {
  width: 100%;
  margin-bottom: 3rem;
  z-index: 2;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 1.8rem;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(43, 110, 240, 0.2);
}

.carousel-slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.carousel-slide {
  flex: 0 0 100%;
  height: 498px;
  position: relative;
  background-size: cover;
  background-position: center;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.85) 0%, rgba(43, 110, 240, 0.2) 100%);
  backdrop-filter: brightness(1.02);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.slide-content {
  max-width: 700px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  padding: 2rem 2.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(43, 110, 240, 0.3);
}

body.dark .slide-content {
  background: rgba(17, 25, 39, 0.85);
  border-color: rgba(95, 158, 255, 0.4);
}

.slide-content h2 {
  font-size: 2.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--tech-blue), #0f3c9e);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.6rem;
}

.slide-content p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.slide-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--tech-blue);
  color: white;
  padding: 0.6rem 1.6rem;
  border-radius: 40px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 10px var(--tech-glow);
  transition: 0.25s;
}

.slide-btn:hover {
  background: var(--tech-blue-light);
  transform: translateY(-2px);
}

:deep(.carousel-btn) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(43, 110, 240, 0.3);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--tech-blue);
  transition: 0.2s;
  z-index: 10;
}
:deep(.carousel-btn svg){
  width: 50%;
  height: 50%;
  fill: var(--tech-blue);
}
:deep(.carousel-btn:hover) {
  background: var(--tech-blue);
  color: white;
}
:deep(.carousel-btn svg:hover){
  fill: white;
}
:deep(.btn-prev) {
  left: 1.2rem;
  transform:translateY(-50%) scaleX(-1);
}

:deep(.btn-next){
  position: absolute;
  right: 1.2rem;
}

/*:deep(.carousel-dots) {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  z-index: 10;
}

:deep(.dot) {
  width: 8px;
  height: 9px;
  background: rgba(43, 110, 240, 0.4);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.25s;
}

:deep(.dot.active) {
  background: var(--tech-blue);
  width: 28px;
}*/

/* 首页双栏布局 */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2.5rem;
  margin: 2rem 0 4rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.8rem;
  border-bottom: 2px solid rgba(43, 110, 240, 0.3);
  padding-bottom: 0.5rem;
}

.section-header h2 {
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section-header a {
  color: var(--tech-blue);
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: var(--bg-card);
  border-radius: 1.25rem;
  overflow: hidden;
  transition: 0.35s;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: var(--tech-blue-light);
}

.card-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  transition: transform 0.4s;
}

.post-card:hover .card-img {
  transform: scale(1.02);
}

.card-content {
  padding: 1.4rem 1.3rem 1.6rem;
}

.post-meta {
  font-size: 0.7rem;
  color: var(--text-muted);
  display: flex;
  gap: 1rem;
  margin-bottom: 0.6rem;
  font-family: monospace;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.post-title a {
  text-decoration: none;
  color: var(--text-primary);
  transition: 0.2s;
}

.post-title a:hover {
  color: var(--tech-blue);
}

.post-excerpt {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.read-more {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--tech-blue);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
}

.read-more i {
  transition: transform 0.2s;
}

.read-more:hover i {
  transform: translateX(4px);
}

/* 侧边栏卡片 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.sidebar-card {
  background: var(--bg-card);
  border-radius: 1.2rem;
  border: 1px solid var(--border-light);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: 0.2s;
}

.sidebar-card:hover {
  border-color: var(--tech-blue-light);
  box-shadow: var(--shadow-md);
}

.author-info {
  text-align: center;
}

.avatar {
  font-size: 2.8rem;
  background: var(--bg-soft);
  width: 80px;
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 1rem;
  color: var(--tech-blue);
  border: 2px solid rgba(43, 110, 240, 0.3);
}

.author-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.author-bio {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.social-links a {
  background: var(--bg-soft);
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--tech-blue);
  transition: 0.2s;
  text-decoration: none;
}

.social-links a:hover {
  background: var(--tech-blue);
  color: white;
  transform: translateY(-2px);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--tech-blue);
  display: inline-block;
}

.category-list {
  list-style: none;
}

.category-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border-light);
}

.category-list li a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: 0.2s;
}

.category-list li a:hover {
  color: var(--tech-blue);
}

.category-count {
  background: var(--bg-soft);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag {
  background: var(--bg-soft);
  padding: 0.25rem 1rem;
  border-radius: 30px;
  font-size: 0.7rem;
  color: var(--tech-blue);
  text-decoration: none;
  transition: 0.2s;
}

.tag:hover {
  background: var(--tech-blue);
  color: white;
}


@media (max-width: 880px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .carousel-container {
    height: 420px;
  }

  .container {
    padding: 0 1.2rem;
  }
}

@media (max-width: 640px) {
  .slide-content h2 {
    font-size: 1.8rem;
  }

  .slide-content {
    padding: 1.2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
<script setup>
import {ref, reactive} from "vue"
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// 引入样式 (Splide 只有一个 CSS 文件，不需要像 Swiper 那样拆分引入)
import '@splidejs/vue-splide/css';
import {getHotArticlesList, getSideList} from "@/api/fronted/article.js";

// 配置项 (比 Swiper 直观太多)
const splideOptions = ref({
  type: 'loop',      // 循环模式
  autoplay: true,    // 开启自动播放 (默认延迟 4000ms)
  interval: 3000,    // 自定义切换间隔 (3秒)
  perPage: 1,        // 一次显示几张
  gap: '1rem',       // 卡片间距
  pagination: true,  // 显示分页圆点
  arrows: true,      // 显示左右箭头
  drag: true,        // 允许拖拽
  classes:{
    arrow:'carousel-btn',
    prev  :'btn-prev',
    next  :'btn-next'
  }
});

// 轮播图
let slide_contents = reactive({
  is_loading:true,  //正在加载
  details:[]        //内容
});
// 文章列表
let article_list = reactive({
  is_loading:true,  //正在加载
  details:[]        //内容
})

//获取轮播内容
const getSlideContent = function (){
  getSideList().then((result)=>{
    slide_contents.is_loading = false
    slide_contents.details = result.details
  },(error)=>{
    console.log(error)
  })
}
//获取文章内容
const getArticles =function (){
  getHotArticlesList().then((result)=>{
      article_list.is_loading = false
      article_list.details = result.details
  },(error)=>{
    console.log(error)
  })
}


getSlideContent();
getArticles()

</script>