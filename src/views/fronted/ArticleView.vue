<template>
  <main>
    <div class="container">
      <div class="article-layout">
        <aside class="toc-sidebar">
          <div class="toc-title">📑 文章目录</div>
          <ul class="toc-list">
            <li class="toc-h2"><a href="#why">为什么需要组合式 API？</a></li>
            <li class="toc-h2"><a href="#reusable">创建可复用的组合式函数</a></li>
            <li class="toc-h2"><a href="#reactivity">响应式原理与性能优化</a></li>
            <li class="toc-h2"><a href="#architecture">大型项目中的架构模式</a></li>
            <li class="toc-h3"><a href="#vs-mixins">组合式函数 vs. Mixins</a></li>
            <li class="toc-h2"><a href="#summary">总结</a></li>
          </ul>
        </aside>
        <article class="article-content">
          <div class="article-header">
            <div class="article-meta"><span><i class="far fa-calendar-alt"></i> 2025年04月08日</span><span><i
                class="far fa-clock"></i> 阅读约 8 分钟</span><span><i class="fas fa-tag"></i> Vue 3 · 组合式 API</span>
            </div>
            <h1 class="article-title">组合式 API 最佳实践：从逻辑复用到可维护架构</h1></div>
          <img class="article-cover" src="https://picsum.photos/id/106/800/400" alt="Vue 组合式 API">
          <div class="article-body"><p>Vue 3 的组合式 API（Composition
            API）为组件逻辑复用和组织带来了革命性的变化。本文将深入探讨如何优雅地使用组合式函数、响应式原理以及大型项目中的架构设计。</p>
            <h2 id="why">为什么需要组合式 API？</h2>
            <p>在 Options API 中，逻辑分散在 data、methods、computed 等选项中，当组件变得复杂时，同一功能的代码被迫分散，导致难以维护。组合式
              API 允许我们按逻辑功能聚合代码，提升可读性和可复用性。</p>
            <h2 id="reusable">创建可复用的组合式函数</h2>
            <p>组合式函数是利用 Vue 响应式系统封装有状态逻辑的函数。命名习惯上使用 <code>use</code> 作为前缀。</p>
            <pre><code>// useMouseTracker.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseTracker() {
  const x = ref(0)
  const y = ref(0)
  const update = (e) => { x.value = e.pageX; y.value = e.pageY }
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  return { x, y }
}</code></pre>
            <h2 id="reactivity">响应式原理与性能优化</h2>
            <p>组合式 API 基于 <code>ref</code> 和 <code>reactive</code> 实现细粒度响应式追踪。需要注意避免过度解构导致响应式丢失，推荐使用
              <code>toRefs</code> 保持响应式连接。</p>
            <blockquote>“组合式 API 的最大价值在于让逻辑关注点分离，而不是关注选项类型。” —— Vue 核心团队</blockquote>
            <h2 id="architecture">大型项目中的架构模式</h2>
            <p>将不同领域的组合式函数放在独立的文件中（如 <code>composables/useAuth</code>、<code>useCart</code>），然后在视图层组合调用。
            </p>
            <h3 id="vs-mixins">组合式函数 vs. Mixins</h3>
            <p>Mixins 存在命名冲突、隐式依赖等问题，而组合式函数通过显式返回值提供了更好的类型安全和可预测性。</p>
            <h2 id="summary">总结</h2>
            <p>组合式 API 是 Vue 3 最强大的特性之一，它让代码更加模块化、可测试，并且易于团队协作。</p></div>
          <div class="article-footer">
            <div class="tag-cloud"><a href="#" class="tag">#Vue3</a><a href="#" class="tag">#CompositionAPI</a><a
                href="#" class="tag">#TypeScript</a><a href="#" class="tag">#前端架构</a></div>
            <div class="share-buttons"><span><i class="fas fa-share-alt"></i> 分享本文：</span><a href="#"><i
                class="fab fa-twitter"></i> Twitter</a><a href="#"><i class="fab fa-weixin"></i> 微信</a></div>
          </div>
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

.article-body h2 {
  font-size: 1.7rem;
  margin: 1.8rem 0 1rem;
  border-left: 4px solid var(--tech-blue);
  padding-left: 1rem;
}

.article-body h3 {
  font-size: 1.3rem;
  margin: 1.5rem 0 0.8rem;
}

.article-body p {
  margin-bottom: 1.2rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.article-body code {
  background: var(--code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  border: 1px solid var(--code-border);
}

.article-body pre {
  background: var(--code-bg);
  padding: 1rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.2rem 0;
  border: 1px solid var(--code-border);
}

.article-body pre code {
  background: none;
  padding: 0;
  border: none;
}

.article-body blockquote {
  border-left: 4px solid var(--tech-blue);
  background: var(--bg-soft);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin: 1.2rem 0;
  font-style: italic;
}

.article-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
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
import {onMounted} from 'vue';

onMounted(() => { // 添加主题切换功能
  const backBtn = document.getElementById('backHomeBtn');
  if (backBtn) backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('演示模式：返回首页');
  });
  const tocLinks = document.querySelectorAll('.toc-list a');
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({behavior: 'smooth'});
    });
  });

})

</script>
