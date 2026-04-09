<template>
    <footer class="site-footer"><div class="container footer-inner"><div class="footer-copyright">© 2025 LightVue · 科技浅蓝博客 | 昼夜双模 | 保持好奇，优雅编码</div><div class="footer-links"><a href="#">RSS</a><a href="#">实验室</a><a href="#">友链</a></div></div></footer>
</template>

<style scoped>
/* 页脚 */
.site-footer { border-top: 1px solid var(--border-light); background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); padding: 2rem 0; margin-top: 2rem; }
body.dark .site-footer { background: rgba(10,15,26,0.8); }
.footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.footer-copyright { color: var(--text-muted); font-size: 0.8rem; }
.footer-links a { color: var(--text-muted); margin-left: 1.5rem; font-size: 0.8rem; text-decoration: none; transition: 0.2s; }
.footer-links a:hover { color: var(--tech-blue); }

</style>
<script setup>

</script>