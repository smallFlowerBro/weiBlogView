<template>
  <main>
    <div class="container">
      <div class="error-section">
        <div class="error-card">
          <!-- 404 插画（科技风格） -->
          <div class="illustration">
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blue404" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#3b82f6"/>
                  <stop offset="100%" stop-color="#1e6fdf"/>
                </linearGradient>
                <linearGradient id="lightBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#60a5fa"/>
                  <stop offset="100%" stop-color="#93c5fd"/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feMerge>
                    <feMergeNode in="offsetblur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <!-- 背景装饰环 -->
              <circle cx="200" cy="140" r="100" stroke="url(#blue404)" stroke-width="1.5" fill="none" opacity="0.25" stroke-dasharray="6 6"/>
              <circle cx="200" cy="140" r="75" stroke="url(#lightBlue)" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="4 8"/>

              <!-- 破损的文档图标 -->
              <g filter="url(#glow)">
                <path d="M160 100 L240 100 L260 120 L260 220 L160 220 Z" fill="url(#blue404)" opacity="0.9"/>
                <path d="M240 100 L240 120 L260 120 Z" fill="#60a5fa" opacity="0.8"/>
                <!-- 问号 -->
                <text x="210" y="175" font-family="Inter, sans-serif" font-size="48" font-weight="800" fill="white" text-anchor="middle">?</text>
              </g>

              <!-- 飘浮的碎片 -->
              <rect x="270" y="130" width="15" height="15" rx="3" fill="url(#lightBlue)" opacity="0.7" transform="rotate(25 277 137)">
                <animateTransform attributeName="transform" type="rotate" from="0 277 137" to="360 277 137" dur="4s" repeatCount="indefinite"/>
              </rect>
              <rect x="130" y="230" width="12" height="12" rx="3" fill="#3b82f6" opacity="0.6" transform="rotate(15 136 236)">
                <animateTransform attributeName="transform" type="rotate" from="0 136 236" to="360 136 236" dur="3.5s" repeatCount="indefinite"/>
              </rect>

              <!-- 轨迹线条 -->
              <path d="M120 250 Q160 270 200 255 Q240 240 280 255" stroke="url(#lightBlue)" stroke-width="1.5" fill="none" stroke-dasharray="4 4" opacity="0.6"/>

              <!-- 科技光点 -->
              <circle cx="120" cy="90" r="2.5" fill="#60a5fa" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="100" r="2" fill="#3b82f6" opacity="0.7">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="320" cy="180" r="2.5" fill="#60a5fa" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          <h1 class="error-code">404</h1>
          <h2 class="error-title">哎呀！页面走丢了</h2>
          <p class="error-message">您访问的页面似乎不存在，可能已被移动或删除。不如搜索一下您想找的内容？</p>

          <!-- 搜索框 -->
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchInput" placeholder="搜索文章...">
          </div>

          <!-- 操作按钮 -->
          <div class="action-buttons">
            <router-link to="/home" class="btn-primary" id="homeBtn">
              <i class="fas fa-home"></i> 返回首页
            </router-link>
            <router-link to="/articles" class="btn-outline" id="archiveBtn">
              <i class="fas fa-archive"></i> 文章归档
            </router-link>
          </div>

          <!-- 推荐文章 -->
          <div class="suggestions">
            <h4><i class="fas fa-compass"></i> 您可能感兴趣</h4>
            <div class="suggestions-links">
              <a href="#">Vue 3 组合式 API 最佳实践</a>
              <a href="#">现代 CSS 魔法：容器查询与网格</a>
              <a href="#">前端性能精讲：从指标到调优</a>
              <a href="#">从零参与开源：我的 PR 之旅</a>
            </div>
          </div>

          <a  href="#"  @click.prevent="prev" class="back-home" id="backHomeLink">
            <i class="fas fa-arrow-left"></i> 回到上一页
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* ========= 404 内容区域 ========= */
.error-section {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.error-card {
  background: var(--bg-card);
  border-radius: var(--radius-card);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 2.5rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.error-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--accent-glow);
}

/* 插画 */
.illustration {
  margin-bottom: 1.5rem;
}
.illustration svg {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 8px 20px rgba(59,130,246,0.15));
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -2px;
  margin-bottom: 0.5rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.error-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

/* 搜索框 */
.search-box {
  max-width: 400px;
  margin: 0 auto 2rem;
  position: relative;
}
.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent);
  font-size: 1rem;
}
.search-box input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;
  background: var(--bg-soft);
  border: 1px solid var(--border-light);
  border-radius: 2rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-family: 'Inter', monospace;
  transition: all 0.2s;
  outline: none;
}
.search-box input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
.search-box input::placeholder {
  color: var(--text-muted);
}

/* 按钮组 */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.btn-primary {
  background: linear-gradient(135deg, var(--accent), #1e6fdf);
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.25s;
  text-decoration: none;
  box-shadow: 0 4px 12px var(--accent-glow);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--accent-glow);
}
.btn-outline {
  background: transparent;
  border: 1px solid var(--accent);
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  font-weight: 500;
  color: var(--accent);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.25s;
  text-decoration: none;
}
.btn-outline:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
}

/* 推荐文章 */
.suggestions {
  border-top: 1px solid var(--border-light);
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}
.suggestions h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.suggestions-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.suggestions-links a {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.85rem;
  transition: 0.2s;
}
.suggestions-links a:hover {
  text-decoration: underline;
}

/* 返回首页链接 */
.back-home {
  margin-top: 1.5rem;
  display: inline-block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
}
.back-home:hover {
  color: var(--accent);
}
/* 响应式 */
@media (max-width: 768px) {
  .container {
    padding: 0 1.2rem;
  }
  .error-card {
    padding: 1.8rem;
    margin: 0 1rem;
  }
  .error-code {
    font-size: 3.5rem;
  }
  .error-title {
    font-size: 1.2rem;
  }
  .illustration svg {
    max-width: 200px;
  }
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  .btn-primary, .btn-outline {
    width: 80%;
    justify-content: center;
  }
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
  .footer-links a {
    margin: 0 0.8rem;
  }
}
</style>
<script setup>
import {useRouter} from "vue-router";
let router = useRouter();
function prev (){
  router.back()
}


</script>