<template>
  <SiteHeader></SiteHeader>
  <main>
    <div class="container">
      <a href="#" class="back-home" id="backHomeBtn"><i class="fas fa-arrow-left"></i> 返回首页</a>
      <div class="page-header">
        <h1>📸 行旅印记 · 光影瀑布</h1>
        <p>照片与视频的时光长廊 | 点击可放大查看</p>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <div class="media-filters">
          <button class="filter-btn active" data-media="all">全部</button>
          <button class="filter-btn" data-media="photo">📷 照片</button>
          <button class="filter-btn" data-media="video">🎬 视频</button>
        </div>
        <div class="total-info" id="totalInfo">📸 共 13 个影像</div>
      </div>

      <!-- 瀑布流网格 -->
      <div class="waterfall" id="waterfallGrid"></div>
    </div>
  </main>
  <!-- 模态框 -->
  <div id="mediaModal" class="modal">
    <div class="modal-content">
      <button class="close-modal" id="closeModalBtn">&times;</button>
      <div id="modalMedia"></div>
      <div id="modalCaption" class="modal-caption"></div>
    </div>
  </div>
  <SiteFooter></SiteFooter>
</template>
<style scoped>
  .page-header {
    text-align: center;
    margin: 2rem 0 1.5rem;
  }
  .page-header h1 {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--text-primary), var(--tech-blue));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .page-header p {
    color: var(--text-muted);
    margin-top: 0.3rem;
  }

  /* 筛选栏 */
  .filter-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .media-filters {
    display: flex;
    gap: 0.8rem;
  }
  .filter-btn {
    background: var(--bg-soft);
    border: none;
    padding: 0.4rem 1.2rem;
    border-radius: 40px;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: 0.2s;
  }
  .filter-btn.active {
    background: var(--tech-blue);
    color: white;
  }
  .total-info {
    font-size: 0.85rem;
    background: var(--bg-soft);
    padding: 0.3rem 1rem;
    border-radius: 40px;
    color: var(--tech-blue);
  }

  /* 瀑布流网格 */
  .waterfall {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  :deep(.media-card) {
    background: var(--bg-card);
    border-radius: 1.2rem;
    overflow: hidden;
    border: 1px solid var(--border-light);
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
  }
  :deep(.media-card:hover) {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
    border-color: var(--tech-blue-light);
  }
  :deep(.media-card img, .media-card video ){
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    background: var(--bg-soft);
  }
  :deep(.media-info) {
    padding: 0.8rem 1rem 1rem;
  }
  .media-title {
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }
  .media-location {
    font-size: 0.7rem;
    color: var(--tech-blue);
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
  .media-date {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 0.3rem;
  }

  /* 模态框 (放大查看) */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
  }
  .modal.active {
    display: flex;
  }
  .modal-content {
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
  }
  .modal-content img, .modal-content video {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 1rem;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
  }
  .close-modal {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    background: none;
    border: none;
  }
  .modal-caption {
    text-align: center;
    color: white;
    margin-top: 0.5rem;
  }

  /* 返回链接 */
  .back-home {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0 1rem;
    color: var(--tech-blue);
    text-decoration: none;
    font-weight: 500;
  }
  .back-home:hover {
    text-decoration: underline;
  }

  /* 页脚 */
  .site-footer {
    border-top: 1px solid var(--border-light);
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(8px);
    padding: 2rem 0;
    margin-top: 2rem;
  }
  body.dark .site-footer {
    background: rgba(10,15,26,0.8);
  }
  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-copyright {
    color: var(--text-muted);
    font-size: 0.8rem;
  }
  .footer-links a {
    color: var(--text-muted);
    margin-left: 1.5rem;
    font-size: 0.8rem;
    text-decoration: none;
    transition: 0.2s;
  }
  .footer-links a:hover {
    color: var(--tech-blue);
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    .waterfall {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }
    .filter-bar {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
<script setup>
  // ----------------------------- 媒体数据 (照片+视频) -----------------------------
  import {onMounted} from "vue";

  const mediaItems = [
    { type: 'photo', url: 'https://picsum.photos/id/104/500/350', title: '羊卓雍措的蓝', location: '西藏·羊湖', date: '2024.09' },
    { type: 'video', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://picsum.photos/id/29/500/350', title: '纳木错星空', location: '西藏·纳木错', date: '2024.09' },
    { type: 'photo', url: 'https://picsum.photos/id/96/500/350', title: '巍峨雪山', location: '四川·四姑娘山', date: '2024.08' },
    { type: 'photo', url: 'https://picsum.photos/id/15/500/350', title: '九寨沟秋色', location: '四川·九寨沟', date: '2024.10' },
    { type: 'photo', url: 'https://picsum.photos/id/169/500/350', title: '古城夕阳', location: '云南·大理', date: '2024.07' },
    { type: 'video', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4', poster: 'https://picsum.photos/id/22/500/350', title: '洱海骑行', location: '云南·洱海', date: '2024.07' },
    { type: 'photo', url: 'https://picsum.photos/id/26/500/350', title: '水乡晨光', location: '浙江·周庄', date: '2024.04' },
    { type: 'photo', url: 'https://picsum.photos/id/42/500/350', title: '茶园漫步', location: '浙江·杭州', date: '2024.05' },
    { type: 'photo', url: 'https://picsum.photos/id/91/500/350', title: '都市霓虹', location: '上海·外滩', date: '2024.11' },
    { type: 'video', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://picsum.photos/id/20/500/350', title: '落日海岸线', location: '海南·三亚', date: '2024.10' },
    { type: 'photo', url: 'https://picsum.photos/id/1/500/350', title: '故宫红墙', location: '北京·故宫', date: '2024.03' },
    { type: 'photo', url: 'https://picsum.photos/id/155/500/350', title: '兵马俑遗迹', location: '陕西·西安', date: '2024.06' },
    { type: 'photo', url: 'https://picsum.photos/id/177/500/350', title: '喀纳斯湖', location: '新疆·喀纳斯', date: '2024.08' },
  ];

  let currentMediaFilter = 'all'; // 'all', 'photo', 'video'

  let waterfallGrid = null;
  let totalInfo = null;

  // 获取筛选后的媒体项
  function getFilteredItems() {
    if (currentMediaFilter === 'all') return mediaItems;
    return mediaItems.filter(item => item.type === currentMediaFilter);
  }

  function renderWaterfall(items) {
    waterfallGrid.innerHTML = '';
    if (items.length === 0) {
      waterfallGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">✨ 暂无影像，期待新的旅途 ✨</div>';
      totalInfo.textContent = `📸 共 0 个影像`;
      return;
    }
    totalInfo.textContent = `📸 共 ${items.length} 个影像`;
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'media-card';
      if (item.type === 'photo') {
        const img = document.createElement('img');
        img.src = item.url;
        img.loading = 'lazy';
        img.alt = item.title;
        card.appendChild(img);
      } else {
        const video = document.createElement('video');
        video.src = item.url;
        video.poster = item.poster;
        video.preload = 'metadata';
        video.style.width = '100%';
        video.addEventListener('click', (e) => e.stopPropagation());
        card.appendChild(video);
      }
      const infoDiv = document.createElement('div');
      infoDiv.className = 'media-info';
      infoDiv.innerHTML = `
                      <div class="media-title">${item.title}</div>
                      <div class="media-location"><i class="fas fa-map-pin"></i> ${item.location}</div>
                      <div class="media-date"><i class="far fa-calendar-alt"></i> ${item.date}</div>
                  `;
      card.appendChild(infoDiv);
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'VIDEO') return;
        openModal(item);
      });
      waterfallGrid.appendChild(card);
    });
  }

  function updateDisplay() {
    const items = getFilteredItems();
    renderWaterfall(items);
  }

  // 监听媒体筛选按钮
  let mediaFilterBtns = null;




  // 模态框逻辑 (放大/全屏)
  let modal = null;
  let modalMedia = null;
  let modalCaption = null;
  let closeModalBtn = null;

  function openModal(item) {
    modalMedia.innerHTML = '';
    if (item.type === 'photo') {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.title;
      modalMedia.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = item.url;
      video.poster = item.poster;
      video.controls = true;
      video.autoplay = false;
      video.style.maxWidth = '100%';
      video.style.maxHeight = '85vh';
      modalMedia.appendChild(video);
    }
    modalCaption.textContent = `${item.title} · ${item.location} · ${item.date}`;
    modal.classList.add('active');
    document.addEventListener('keydown', escHandler);
  }

  function closeModal() {
    modal.classList.remove('active');
    modalMedia.innerHTML = '';
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) {
    if (e.key === 'Escape') closeModal();
  }





  // Toast 提示
  function showToast(msg) {
    let toast = document.querySelector('.trail-toast');
    if (toast) toast.remove();
    toast = document.createElement('div');
    toast.className = 'trail-toast';
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--tech-blue)';
    toast.style.color = 'white';
    toast.style.padding = '8px 20px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '0.8rem';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 12px var(--tech-glow)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
  onMounted(()=>{


   waterfallGrid = document.getElementById('waterfallGrid');
   totalInfo = document.getElementById('totalInfo');

    modal = document.getElementById('mediaModal');
    modalMedia = document.getElementById('modalMedia');
    modalCaption = document.getElementById('modalCaption');
    closeModalBtn = document.getElementById('closeModalBtn');
    closeModalBtn.addEventListener('click', closeModal);
    mediaFilterBtns = document.querySelectorAll('.filter-btn');
    mediaFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mediaFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMediaFilter = btn.getAttribute('data-media');
        updateDisplay();
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // 初始渲染
    updateDisplay();
    // 返回首页演示
    const backBtn = document.getElementById('backHomeBtn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('✨ 返回首页 (演示模式)');
      });
    }
  })

</script>