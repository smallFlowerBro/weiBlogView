<template>
  <main>
    <div class="container">
      <div class="about-layout">
        <div class="hero-card">
          <div class="avatar-large"><i class="fas fa-user-astronaut"></i></div>
          <h1>林星野 · Starlin</h1>
          <div class="tagline">全栈架构师 · Vue 生态贡献者 · 开源热爱者</div>
          <p class="bio">
            深耕前端工程化与云原生领域多年，热衷于探索优雅的代码架构与前沿技术。相信技术不仅是工具，更是连接创造与人文的桥梁。</p>
          <div class="social-links"><a href="#"><i class="fab fa-github"></i></a><a href="#"><i
              class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-js"></i></a><a href="#"><i
              class="fas fa-envelope"></i></a></div>
        </div>
        <div class="about-grid">
          <div class="info-card">
            <div class="card-title"><i class="fas fa-microchip"></i> 技术栈</div>
            <div class="skill-list"><span class="skill-item">JavaScript/TypeScript</span><span class="skill-item">Vue 3 / Nuxt</span><span
                class="skill-item">React / Next</span><span class="skill-item">Node.js / Nest</span><span
                class="skill-item">Python / FastAPI</span><span class="skill-item">Tailwind / SCSS</span><span
                class="skill-item">Docker / K8s</span><span class="skill-item">GitHub Actions</span></div>
            <div style="margin-top:1.5rem;">
              <div class="card-title" style="margin-top:0;"><i class="fas fa-tools"></i> 开发工具</div>
              <div class="skill-list"><span class="skill-item">VS Code</span><span class="skill-item">Vite</span><span
                  class="skill-item">WebStorm</span><span class="skill-item">Figma</span><span class="skill-item">Postman</span>
              </div>
            </div>
          </div>
          <div class="info-card">
            <div class="card-title"><i class="fas fa-briefcase"></i> 经历</div>
            <div class="exp-item"><h3>资深前端架构师 · 某科技公司</h3>
              <div class="exp-meta">2022 — 至今 · 远程</div>
              <div class="exp-desc">负责低代码平台前端架构，推动组件库标准化与性能优化，落地 Vue 3 + TypeScript。</div>
            </div>
            <div class="exp-item"><h3>全栈开发工程师 · 创业团队</h3>
              <div class="exp-meta">2019 — 2022 · 杭州</div>
              <div class="exp-desc">参与多个中后台系统从 0 到 1 建设，实现前端工程化配置，维护 Node.js 中间层。</div>
            </div>
            <div class="exp-item"><h3>计算机科学与技术 · 硕士</h3>
              <div class="exp-meta">2016 — 2019 · 浙江大学</div>
              <div class="exp-desc">研究方向为前端性能优化与 WebAssembly，发表论文两篇。</div>
            </div>
          </div>
        </div>
        <div class="contact-card">
          <div class="card-title" style="justify-content:center; border-left:none;"><i class="fas fa-paper-plane"></i>
            联系与开源
          </div>
          <div class="contact-grid"><a href="#" class="contact-item"><i class="fab fa-github"></i>
            github.com/starlin</a><a href="#" class="contact-item"><i class="fab fa-twitter"></i> @starlin_dev</a><a
              href="#" class="contact-item"><i class="fas fa-envelope"></i> starlin@lightvue.dev</a></div>
          <p style="margin-top:1.2rem; font-size:0.85rem; color:var(--text-muted);"><i class="fas fa-heart"
                                                                                       style="color:var(--tech-blue);"></i>
            开源项目贡献：Vue 生态工具链、Vite 插件、组件库。</p></div>
      </div>
    </div>
  </main>

</template>
<style scoped>
/* 关于页特有样式 */
.about-layout {
  margin: 2.5rem 0 4rem;
}

.hero-card {
  background: var(--bg-card);
  border-radius: 1.5rem;
  border: 1px solid var(--border-light);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.avatar-large {
  width: 120px;
  height: 120px;
  background: linear-gradient(145deg, var(--tech-blue), #1a4fcf);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px var(--tech-glow);
}

.avatar-large i {
  font-size: 3.5rem;
  color: white;
}

.hero-card h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary), var(--tech-blue));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero-card .tagline {
  font-size: 1.1rem;
  color: var(--tech-blue);
  margin-bottom: 1rem;
}

.hero-card .bio {
  max-width: 700px;
  margin: 0 auto 1.5rem;
  color: var(--text-secondary);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links a {
  background: var(--bg-soft);
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--tech-blue);
  font-size: 1.2rem;
  transition: 0.2s;
}

.social-links a:hover {
  background: var(--tech-blue);
  color: white;
  transform: translateY(-3px);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background: var(--bg-card);
  border-radius: 1.5rem;
  border: 1px solid var(--border-light);
  padding: 1.8rem;
  box-shadow: var(--shadow-sm);
  transition: 0.2s;
}

.info-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--tech-blue-light);
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--tech-blue);
  border-left: 4px solid var(--tech-blue);
  padding-left: 0.8rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.skill-item {
  background: var(--bg-soft);
  padding: 0.4rem 1rem;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--tech-blue);
  border: 1px solid rgba(43, 110, 240, 0.2);
}

.exp-item {
  margin-bottom: 1.2rem;
}

.exp-item h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.exp-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
  font-family: monospace;
}

.exp-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.contact-card {
  background: var(--bg-card);
  border-radius: 1.5rem;
  border: 1px solid var(--border-light);
  padding: 1.8rem;
  text-align: center;
}

.contact-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
}

.contact-item i {
  font-size: 1.3rem;
  color: var(--tech-blue);
}

.contact-item:hover {
  color: var(--tech-blue);
  transform: translateY(-2px);
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--tech-blue);
  text-decoration: none;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1.2rem;
  }

  .hero-card h1 {
    font-size: 1.6rem;
  }
}
</style>
<script setup>
import {onMounted} from 'vue';

onMounted(() => {

})
</script>
