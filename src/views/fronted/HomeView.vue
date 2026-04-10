<template>
<section class="carousel-section">
    <div class="carousel-container">
        <div class="carousel-slides" id="carouselSlides">
            <div class="carousel-slide" style="background-image: linear-gradient(145deg,#b2d9ff,#d9eaff),url('https://picsum.photos/id/20/1920/640'); background-blend-mode: overlay;">
                <div class="slide-overlay">
                    <div class="slide-content">
                      <h2>Vue 3 组合式核心</h2>
                      <p>响应式原理与复用逻辑深度解析</p>
                      <a href="#" class="slide-btn">探索技术 <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="carousel-slide" style="background-image: linear-gradient(145deg,#b2d9ff,#d9eaff),url('https://picsum.photos/id/26/1920/640'); background-blend-mode: overlay;">
                <div class="slide-overlay">
                    <div class="slide-content">
                      <h2>现代前端工程化</h2>
                      <p>Vite + TypeScript 最佳实践</p><a href="#" class="slide-btn">深入工程 <i class="fas fa-tools"></i></a>
                    </div>
                </div>
            </div>
          <div class="carousel-slide" style="background-image: linear-gradient(145deg,#b2d9ff,#d9eaff),url('https://picsum.photos/id/15/1920/640'); background-blend-mode: overlay;">
              <div class="slide-overlay">
                  <div class="slide-content">
                      <h2>科技与设计共生</h2>
                      <p>浅色科技风，代码与美学交汇</p><a href="#" class="slide-btn">设计灵感 <i class="fas fa-palette"></i></a>
                  </div>
              </div>
          </div>
        </div>
      <button class="carousel-btn btn-prev" id="prevBtn"><i class="fas fa-chevron-left"></i></button><button class="carousel-btn btn-next" id="nextBtn"><i class="fas fa-chevron-right"></i></button><div class="carousel-dots" id="carouselDots"></div>
    </div>
</section>
<main>
  <div class="container">
    <div class="blog-layout">
      <div><div class="section-header"><h2>最新·技术视野</h2><a href="#">全部文章 <i class="fas fa-arrow-right"></i></a></div><div class="posts-grid"><article class="post-card"><img class="card-img" src="https://picsum.photos/id/106/500/240" alt="组合式API"><div class="card-content"><div class="post-meta"><span><i class="far fa-calendar-alt"></i> 2025.04.08</span><span><i class="far fa-clock"></i> 6 min</span></div><h3 class="post-title"><a href="#">组合式 API 最佳实践与逻辑复用</a></h3><p class="post-excerpt">深入理解 composables、响应式原理，构建高复用组件库。</p><a href="#" class="read-more">阅读全文 <i class="fas fa-arrow-right"></i></a></div></article><article class="post-card"><img class="card-img" src="https://picsum.photos/id/169/500/240" alt="CSS科技"><div class="card-content"><div class="post-meta"><span><i class="far fa-calendar-alt"></i> 2025.03.28</span><span><i class="far fa-clock"></i> 4 min</span></div><h3 class="post-title"><a href="#">现代 CSS 魔法：容器查询与网格进化</a></h3><p class="post-excerpt">用纯 CSS 实现玻璃态、动态布局，让界面充满科技呼吸感。</p><a href="#" class="read-more">阅读全文 <i class="fas fa-arrow-right"></i></a></div></article><article class="post-card"><img class="card-img" src="https://picsum.photos/id/91/500/240" alt="性能优化"><div class="card-content"><div class="post-meta"><span><i class="far fa-calendar-alt"></i> 2025.03.20</span><span><i class="far fa-clock"></i> 8 min</span></div><h3 class="post-title"><a href="#">前端性能精讲：从指标到极致调优</a></h3><p class="post-excerpt">Core Web Vitals、代码分割、预加载策略，让应用秒开。</p><a href="#" class="read-more">阅读全文 <i class="fas fa-arrow-right"></i></a></div></article><article class="post-card"><img class="card-img" src="https://picsum.photos/id/42/500/240" alt="开源贡献"><div class="card-content"><div class="post-meta"><span><i class="far fa-calendar-alt"></i> 2025.03.10</span><span><i class="far fa-clock"></i> 5 min</span></div><h3 class="post-title"><a href="#">从零参与开源：我的第一个 PR 之旅</a></h3><p class="post-excerpt">Git 协作、社区沟通，真实经验分享，拥抱开源世界。</p><a href="#" class="read-more">阅读全文 <i class="fas fa-arrow-right"></i></a></div></article></div></div><aside class="sidebar"><div class="sidebar-card author-info"><div class="avatar"><i class="fas fa-microchip"></i></div><div class="author-name">林星野</div><div class="author-bio">全栈架构师 · Vue 生态贡献者。热爱前沿科技与优雅设计。</div><div class="social-links"><a href="#"><i class="fab fa-github"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-js"></i></a><a href="#"><i class="fas fa-envelope"></i></a></div></div><div class="sidebar-card"><div class="sidebar-title">📡 探索分类</div><ul class="category-list"><li><a href="#">Vue 生态</a><span class="category-count">14</span></li><li><a href="#">前端架构</a><span class="category-count">11</span></li><li><a href="#">CSS 艺术</a><span class="category-count">9</span></li><li><a href="#">开源贡献</a><span class="category-count">7</span></li><li><a href="#">AI 编程</a><span class="category-count">5</span></li></ul></div><div class="sidebar-card"><div class="sidebar-title">⚡ 科技标签</div><div class="tag-cloud"><a href="#" class="tag">#Vue3</a><a href="#" class="tag">#Vite</a><a href="#" class="tag">#TypeScript</a><a href="#" class="tag">#Tailwind</a><a href="#" class="tag">#WebGPU</a><a href="#" class="tag">#Rust</a></div></div><div class="sidebar-card"><div class="sidebar-title">✨ 灵感短语</div><p style="font-size:0.85rem; color:var(--text-secondary); font-style:italic;">“代码如诗，科技向善。轻量 · 响应 · 未来”</p></div></aside></div></div></main>

</template>
<style lang="css" scoped>
    /* 轮播图 */
    .carousel-section { width: 100%; margin-bottom: 3rem; z-index: 2; }
    .carousel-container { position: relative; width: 100%; height: 500px; overflow: hidden; border-radius: 1.8rem; box-shadow: var(--shadow-md); border: 1px solid rgba(43,110,240,0.2); }
    .carousel-slides { display: flex; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
    .carousel-slide { flex: 0 0 100%; height: 100%; position: relative; background-size: cover; background-position: center; }
    .slide-overlay { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(255,255,255,0.85) 0%, rgba(43,110,240,0.2) 100%); backdrop-filter: brightness(1.02); display: flex; align-items: center; justify-content: center; text-align: center; }
    .slide-content { max-width: 700px; background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); padding: 2rem 2.5rem; border-radius: 2rem; border: 1px solid rgba(43,110,240,0.3); }
     body.dark .slide-content { background: rgba(17,25,39,0.85); border-color: rgba(95,158,255,0.4); }
    .slide-content h2 { font-size: 2.6rem; font-weight: 800; background: linear-gradient(135deg, var(--tech-blue), #0f3c9e); background-clip: text; -webkit-background-clip: text; color: transparent; margin-bottom: 0.6rem; }
    .slide-content p { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
    .slide-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--tech-blue); color: white; padding: 0.6rem 1.6rem; border-radius: 40px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 10px var(--tech-glow); transition: 0.25s; }
    .slide-btn:hover { background: var(--tech-blue-light); transform: translateY(-2px); }
    .carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.7); backdrop-filter: blur(6px); border: 1px solid rgba(43,110,240,0.3); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; color: var(--tech-blue); transition: 0.2s; z-index: 10; }
    .carousel-btn:hover { background: var(--tech-blue); color: white; }
    .btn-prev { left: 1.2rem; } .btn-next { right: 1.2rem; }
    .carousel-dots { position: absolute; bottom: 1rem; left: 0; right: 0; display: flex; justify-content: center; gap: 0.6rem; z-index: 10; }
    :deep(.dot) {
        width: 8px;
        height: 9px;
        background: rgba(43,110,240,0.4);
        border-radius: 20px;
        cursor: pointer;
        transition: 0.25s;
    }
    :deep(.dot.active) {
        background: var(--tech-blue);
        width: 28px;
    }

    /* 首页双栏布局 */
    .blog-layout { display: grid; grid-template-columns: 1fr 320px; gap: 2.5rem; margin: 2rem 0 4rem; }
    .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.8rem; border-bottom: 2px solid rgba(43,110,240,0.3); padding-bottom: 0.5rem; }
    .section-header h2 { font-size: 1.7rem; font-weight: 700; color: var(--text-primary); }
    .section-header a { color: var(--tech-blue); font-weight: 500; font-size: 0.9rem; text-decoration: none; }
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 2rem; }
    .post-card { background: var(--bg-card); border-radius: 1.25rem; overflow: hidden; transition: 0.35s; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); }
    .post-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); border-color: var(--tech-blue-light); }
    .card-img { width: 100%; height: 190px; object-fit: cover; transition: transform 0.4s; }
    .post-card:hover .card-img { transform: scale(1.02); }
    .card-content { padding: 1.4rem 1.3rem 1.6rem; }
    .post-meta { font-size: 0.7rem; color: var(--text-muted); display: flex; gap: 1rem; margin-bottom: 0.6rem; font-family: monospace; }
    .post-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.6rem; }
    .post-title a { text-decoration: none; color: var(--text-primary); transition: 0.2s; }
    .post-title a:hover { color: var(--tech-blue); }
    .post-excerpt { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem; line-height: 1.5; }
    .read-more { font-weight: 600; font-size: 0.8rem; color: var(--tech-blue); display: inline-flex; align-items: center; gap: 0.3rem; text-decoration: none; }
    .read-more i { transition: transform 0.2s; }
    .read-more:hover i { transform: translateX(4px); }

    /* 侧边栏卡片 */
    .sidebar { display: flex; flex-direction: column; gap: 1.8rem; }
    .sidebar-card { background: var(--bg-card); border-radius: 1.2rem; border: 1px solid var(--border-light); padding: 1.5rem; box-shadow: var(--shadow-sm); transition: 0.2s; }
    .sidebar-card:hover { border-color: var(--tech-blue-light); box-shadow: var(--shadow-md); }
    .author-info { text-align: center; }
    .avatar { font-size: 2.8rem; background: var(--bg-soft); width: 80px; height: 80px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; margin-bottom: 1rem; color: var(--tech-blue); border: 2px solid rgba(43,110,240,0.3); }
    .author-name { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.3rem; }
    .author-bio { color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem; }
    .social-links { display: flex; justify-content: center; gap: 0.8rem; }
    .social-links a { background: var(--bg-soft); width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: var(--tech-blue); transition: 0.2s; text-decoration: none; }
    .social-links a:hover { background: var(--tech-blue); color: white; transform: translateY(-2px); }
    .sidebar-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; padding-bottom: 0.3rem; border-bottom: 2px solid var(--tech-blue); display: inline-block; }
    .category-list { list-style: none; }
    .category-list li { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--border-light); }
    .category-list li a { color: var(--text-secondary); text-decoration: none; transition: 0.2s; }
    .category-list li a:hover { color: var(--tech-blue); }
    .category-count { background: var(--bg-soft); padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 0.6rem; }
    .tag { background: var(--bg-soft); padding: 0.25rem 1rem; border-radius: 30px; font-size: 0.7rem; color: var(--tech-blue); text-decoration: none; transition: 0.2s; }
    .tag:hover { background: var(--tech-blue); color: white; }



    @media (max-width: 880px) {
        .blog-layout { grid-template-columns: 1fr; }
        .carousel-container { height: 420px; }
        .container { padding: 0 1.2rem; }
    }
    @media (max-width: 640px) {
        .slide-content h2 { font-size: 1.8rem; }
        .slide-content { padding: 1.2rem; }
        .posts-grid { grid-template-columns: 1fr; }
    }
</style>
<script setup>

    import { onMounted } from 'vue';

    onMounted(() => { 
    const slidesContainer = document.getElementById('carouselSlides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn'), nextBtn = document.getElementById('nextBtn'), dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0, total = slides.length, autoInterval;
    function createDots() { dotsContainer.innerHTML = ''; for (let i=0;i<total;i++) { let dot = document.createElement('div'); dot.classList.add('dot'); if(i===currentIndex) dot.classList.add('active'); dot.addEventListener('click',()=>goToSlide(i)); dotsContainer.appendChild(dot); } }
    function updateDots() { const dots = document.querySelectorAll('.dot'); dots.forEach((dot,idx)=>{ if(idx===currentIndex) dot.classList.add('active'); else dot.classList.remove('active'); }); }
    function goToSlide(index) { if(index<0) index=total-1; if(index>=total) index=0; currentIndex=index; slidesContainer.style.transform=`translateX(-${currentIndex*100}%)`; updateDots(); resetAutoPlay(); }
    function nextSlide() { goToSlide(currentIndex+1); }
    function prevSlide() { goToSlide(currentIndex-1); }
    function startAutoPlay() { if(autoInterval) clearInterval(autoInterval); autoInterval = setInterval(nextSlide,5500); }
    function resetAutoPlay() { if(autoInterval) clearInterval(autoInterval); startAutoPlay(); }

        prevBtn.addEventListener('click',()=>{ prevSlide(); resetAutoPlay(); });
        nextBtn.addEventListener('click',()=>{ nextSlide(); resetAutoPlay(); });
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter',()=>{ if(autoInterval) clearInterval(autoInterval); });
        carouselContainer.addEventListener('mouseleave',()=>{ startAutoPlay(); });
        createDots(); startAutoPlay();


        // 演示toast
        function showToast(msg) { let toast = document.querySelector('.demo-toast'); if(toast) toast.remove(); toast = document.createElement('div'); toast.className='demo-toast'; toast.textContent=msg; toast.style.position='fixed'; toast.style.bottom='24px'; toast.style.left='50%'; toast.style.transform='translateX(-50%)'; toast.style.backgroundColor='var(--tech-blue)'; toast.style.color='white'; toast.style.padding='8px 20px'; toast.style.borderRadius='40px'; toast.style.fontSize='0.8rem'; toast.style.zIndex='9999'; document.body.appendChild(toast); setTimeout(()=>toast.remove(),2000); }
        const demoLinks = document.querySelectorAll('.read-more, .slide-btn, .tag, .category-list a, .footer-links a, .logo a, .nav-menu a:not(.theme-toggle)');
        // demoLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); showToast(`🔍 演示模式：${link.innerText.trim()} 即将开放`); }); });
    });
</script>