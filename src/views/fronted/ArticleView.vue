<template>
  <main>
    <div class="container">
      <div class="article-layout">
        <aside class="toc-sidebar">
          <div class="toc-title">📑 文章目录</div>
          <el-skeleton :loading="article_info.is_loading">
            <ul class="toc-list">
              <li v-for="(item,index) in article_info.toc_list" :class="'toc-h'+item.level" :key="index"><a
                  :href="'#'+item.id">{{ item.title }}</a></li>
            </ul>
            <template #template>
              <el-skeleton-item variant="rect" class="w-100 " style="height: 200px"></el-skeleton-item>
            </template>
          </el-skeleton>

        </aside>
        <article class="article-content">
          <el-skeleton :loading="article_info.is_loading">
            <div class="article-header">
              <div class="article-meta"><span><i class="far fa-calendar-alt"></i> {{article_info.infos.publish_time}}</span><span><i
                  class="far fa-clock"></i> 阅读约 {{article_info.infos.read_time}}</span><span><i class="fas fa-tag"></i> {{article_info.infos.main_tag}}</span>
              </div>
              <h1 class="article-title">{{article_info.ab_title}}</h1>
            </div>

            <img class="article-cover" :src="article_info.infos.article_cover" :alt="article_info.infos.main_tag">
            <div class="article-body">
              <div v-html="article_info.content_html"></div>
            </div>
            <div class="article-footer">
              <div class="tag-cloud"><a href="#" class="tag">#Vue3</a><a href="#" class="tag">#CompositionAPI</a><a
                  href="#" class="tag">#TypeScript</a><a href="#" class="tag">#前端架构</a></div>
              <div class="share-buttons"><span><i class="fas fa-share-alt"></i> 分享本文：</span><a href="#"><i
                  class="fab fa-twitter"></i> Twitter</a><a href="#"><i class="fab fa-weixin"></i> 微信</a></div>
            </div>
            <template #template>
              <el-skeleton-item variant="rect" class="w-100 " style="height: 400px"></el-skeleton-item>
            </template>
          </el-skeleton>

          <div class="comments-section"><h3 style="margin-bottom:1rem;">💬 精彩评论</h3>
            <div class="comment-item">
              <div class="comment-name">@Alex Chen</div>
              <div class="comment-text">非常实用的总结，组合式函数让代码复用变得优雅很多！</div>
            </div>
            <div class="comment-item">
              <div class="comment-name">@Eva Zhang</div>
              <div class="comment-text">期待后续关于 Pinia 的文章 🙌</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>

</template>

<style lang="css" scoped>
/* 文章页布局 */
.article-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  margin: 2rem 0 4rem;
}

.toc-sidebar {
  position: sticky;
  top: 100px;
  align-self: start;
  background: var(--bg-card);
  border-radius: 1.2rem;
  border: 1px solid var(--border-light);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.toc-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--tech-blue);
  display: inline-block;
}

.toc-list {
  list-style: none;
  margin-top: 0.5rem;
}

.toc-list li {
  margin: 0.6rem 0;
}

.toc-list a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.85rem;
  transition: 0.2s;
  display: block;
}

.toc-list a:hover {
  color: var(--tech-blue);
  transform: translateX(4px);
}

.toc-list .toc-h2 {
  font-weight: 600;
}

.toc-list .toc-h3 {
  margin-left: 1rem;
  font-size: 0.8rem;
}

.article-content {
  background: var(--bg-card);
  border-radius: 1.5rem;
  border: 1px solid var(--border-light);
  padding: 2rem 2.2rem;
  box-shadow: var(--shadow-sm);
}

.article-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 1.5rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-family: monospace;
}

.article-title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.3;
  background: linear-gradient(135deg, var(--text-primary), var(--tech-blue));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.article-cover {
  width: 100%;
  border-radius: 1rem;
  margin: 1.5rem 0;
  max-height: 400px;
  object-fit: cover;
  border: 1px solid var(--border-light);
}

:deep(.article-body h2) {
  font-size: 1.7rem;
  margin: 1.8rem 0 1rem;
  border-left: 4px solid var(--tech-blue);
  padding-left: 1rem;
}

:deep(.article-body h3) {
  font-size: 1.3rem;
  margin: 1.5rem 0 0.8rem;
}

:deep(.article-body p ) {
  margin-bottom: 1.2rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

:deep(.article-body code) {
  background: var(--code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  border: 1px solid var(--code-border);
}

:deep(.article-body pre ) {
  background: var(--code-bg);
  padding: 1rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.2rem 0;
  border: 1px solid var(--code-border);
}

:deep(.article-body pre code) {
  background: none;
  padding: 0;
  border: none;
}

:deep(.article-body blockquote) {
  border-left: 4px solid var(--tech-blue);
  background: var(--bg-soft);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin: 1.2rem 0;
  font-style: italic;
}

:deep(.article-footer) {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}
/* 1. 无序列表基础样式 */
:deep(.article-body ul) {
  margin: 1.2rem 0 1.2rem 1.8rem;
  padding-left: 0.5rem;
  list-style: none;          /* 移除原生圆点，使用自定义图标 */
}

/* 列表项 */
:deep(.article-body li) {
  position: relative;
  margin-bottom: 0.6rem;
  padding-left: 1.4rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

/* 自定义科技感圆点（带光晕） */
:deep(.article-body li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65rem;
  width: 6px;
  height: 6px;
  background: var(--tech-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--tech-glow);
  transition: all 0.2s ease;
}

/* 悬停时圆点放大 + 文字微移 */
:deep(.article-body li:hover::before) {
  transform: scale(1.3);
  background: var(--tech-blue-light);
  box-shadow: 0 0 0 3px var(--tech-glow);
}

:deep(.article-body li:hover){
  color: var(--text-primary);
  transform: translateX(2px);
}

/* ========= 2. 有序列表 (数字科技风格) ========= */
:deep(.article-body ol) {
  margin: 1.2rem 0 1.2rem 1.8rem;
  padding-left: 0.5rem;
  list-style: none;
  counter-reset: tech-counter;
}

:deep(.article-body ol li) {
  counter-increment: tech-counter;
  position: relative;
  margin-bottom: 0.7rem;
  padding-left: 1.8rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
:deep(.article-body ol li::before)
 {
  content: counter(tech-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--bg-soft);
  color: var(--tech-blue);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  line-height: 1.3rem;
  border-radius: 6px;
  border: 1px solid var(--border-light);
  transition: all 0.2s ease;
}

:deep(.article-body ol li:hover::before){
  background: var(--tech-blue);
  color: white;
  border-color: var(--tech-blue);
  transform: scale(1.05);
  box-shadow: 0 2px 6px var(--tech-glow);
}

/* ========= 3. 嵌套列表（二级列表缩进 + 特殊样式） ========= */
:deep(.article-body ul ul,
.article-body ol ul){
  margin: 0.4rem 0 0.4rem 1.2rem;
}

:deep(.article-body ul ul li::before ){
  width: 4px;
  height: 4px;
  top: 0.7rem;
  background: var(--text-muted);
  box-shadow: none;
}

:deep(.article-body ul ul li:hover::before){
  transform: scale(1.2);
  background: var(--tech-blue);
}

/* 二级有序列表继承但微调数字样式 */
:deep(.article-body ol ol li::before) {
  background: var(--bg-card);
  font-size: 0.7rem;
  width: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  border: 1px solid var(--border-light);
}

/* ========= 4. 科技感任务列表样式 (可选，用于 TODO 风格) ========= */
:deep(.article-body ul.task-list ){
  list-style: none;
  margin-left: 0.5rem;
}

:deep(.article-body ul.task-list li){
  padding-left: 1.8rem;
}

:deep(.article-body input[type="checkbox"]) {
  appearance: none;
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1.5px solid var(--tech-blue);
  border-radius: 3px;
  background: var(--bg-soft);
  margin-right: 0.6rem;
  vertical-align: middle;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  top: -1px;
}

:deep(.article-body input[type="checkbox"]:checked){
  background: var(--tech-blue);
  box-shadow: 0 0 4px var(--tech-blue);
  border-color: var(--tech-blue);
}

:deep(.article-body input[type="checkbox"]:checked::after) {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 0.7rem;
  left: 2px;
  top: -1px;
}

/* ========= 5. 响应式适配 ========= */
@media (max-width: 768px) {
  :deep(.article-body ul,
  .article-body ol)
   {
    margin-left: 1rem;
  }

  :deep(.article-body li){
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  :deep(.article-body li::before) {
    top: 0.55rem;
  }
}

/* ========= 6. 深色模式自动适配（无需额外代码，变量已生效） ========= */
/* 深色模式下，列表文字颜色、圆点、边框均会随主题变量自动变化 */

/* ========= 7. 可选：列表区块增加细微分割线 ========= */
:deep(.article-body ul:not(:first-child),
.article-body ol:not(:first-child) ){
  margin-top: 1rem;
}

/* 列表内部链接样式（可选） */
:deep(.article-body li a){
  color: var(--tech-blue);
  text-decoration: none;
  border-bottom: 1px dotted transparent;
  transition: 0.2s;
}

:deep(.article-body li a:hover) {
  border-bottom-color: var(--tech-blue);
  color: var(--tech-blue-light);
}

/* ========= 8. 大列表、紧凑模式（用于代码块附近的列表） ========= */
:deep(.article-body.compact-list li){
  margin-bottom: 0.3rem;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: var(--bg-soft);
  padding: 0.25rem 1rem;
  border-radius: 30px;
  font-size: 0.7rem;
  color: var(--tech-blue);
  text-decoration: none;
}

.tag:hover {
  background: var(--tech-blue);
  color: white;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.share-buttons a {
  color: var(--tech-blue);
  text-decoration: none;
  font-size: 0.9rem;
}

.comments-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.comment-item {
  background: var(--bg-soft);
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.comment-name {
  font-weight: 700;
  color: var(--tech-blue);
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--tech-blue);
  text-decoration: none;
}

@media (max-width: 880px) {
  .article-layout {
    grid-template-columns: 1fr;
  }

  .toc-sidebar {
    position: static;
  }

  .container {
    padding: 0 1.2rem;
  }

  .article-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 640px) {
  .article-content {
    padding: 1.5rem;
  }
}
</style>

<script setup>

import {onMounted, reactive, ref} from 'vue';
import {useRoute} from "vue-router";
//请求相关
import fetch from "@/lib/fetch/index.js";
import api from "@/api.js";
import UUIDManager from "@/lib/utils/index.js";
//markdown相关
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from "highlight.js";
import markdownItToc from "@/plugin/markdownItToc.js";

// 前面路由传过来的参数
let route = useRoute();
let params = route.params;
//
let md = null;

//文章
let article_info = reactive({
  //是否加载
  is_loading:true,
  //目录
  toc_list:[],
  //内容信息
  infos:{},
  //文章内容
  content_html:""
})
let is_loading = ref(true)
//目录
let toc_list = ref([])
let md_content = ref("");


const getArticleDetail = async function () {
  return await fetch.post(api.web2db_q_article_detail, {
    id: params.id
  }).then((result) => {
    return result
  }, (error) => {
    console.log(error)
    return
  })
}


const renderArticle = function (article) {
  if(!article){
    return;
  }
  article_info.content_html =  md.render(article.text)
  article_info.toc_list = md.toc
  article_info.is_loading = false;
  article_info.infos=Object.assign({},article)
  article_info.ab_title = article.main_title+": "+article.sub_title
}


const init = function () {
  md = new MarkdownIt({
    html: true,        // 允许HTML标签
    linkify: true,     // 自动识别URL
    typographer: true, // 启用一些语言中性替换
    breaks: true,       // 将换行符转换为<br>
    highlight: function (str, lang) {
      // 如果指定了语言且 highlight.js 支持该语言
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 返回高亮后的 HTML
          return hljs.highlight(str, {language: lang}).value
        } catch (__) {
        }
      }
      // 如果没有指定语言或语言不支持，使用默认转义
      return md.utils.escapeHtml(str)
    }
  })
  // 目录生成锚点
  md.use(anchor, {
    level: [1, 2, 3],  // 生成锚点的标题级别
    permalink: false,    // 不显示永久链接
    slugify: () => {
      return UUIDManager.v4()
    }
  });
  // 抽取目录
  md.use(markdownItToc, {level: [1, 2, 3]});
  //获取数据
  getArticleDetail().then(renderArticle)
}

init();
// onMounted(() => { // 添加主题切换功能
//   const backBtn = document.getElementById('backHomeBtn');
//   if (backBtn) backBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     alert('演示模式：返回首页');
//   });
//   const tocLinks = document.querySelectorAll('.toc-list a');
//   tocLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const targetId = link.getAttribute('href').substring(1);
//       const el = document.getElementById(targetId);
//       if (el) el.scrollIntoView({behavior: 'smooth'});
//     });
//   });
//
// })

</script>
