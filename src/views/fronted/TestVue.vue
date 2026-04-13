<template>
  <div class="container">
    <h2>Vue Splide 极简演示</h2>

    <!--
      1. 核心组件：Splide
      2. options: 配置项，非常直观
    -->
    <Splide :options="splideOptions" class="my-splide">

      <!-- 循环渲染 Slide -->
      <SplideSlide v-for="(item, index) in slides" :key="index">
        <div class="slide-content" :style="{ background: item.color }">
          <h1>{{ item.title }}</h1>
          <p>{{ item.desc }}</p>
        </div>
      </SplideSlide>

    </Splide>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 引入核心组件
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// 引入样式 (Splide 只有一个 CSS 文件，不需要像 Swiper 那样拆分引入)
import '@splidejs/vue-splide/css';

// 模拟数据
const slides = ref([
  { title: 'Slide 1', desc: 'Splide 非常轻量', color: '#ff9a9e' },
  { title: 'Slide 2', desc: '代码结构超清晰', color: '#a18cd1' },
  { title: 'Slide 3', desc: '自动播放很简单', color: '#84fab0' },
]);

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
});
</script>

<style scoped>
.container {
  width: 80%;
  margin: 50px auto;
  text-align: center;
}

/* 必须给 Splide 容器设置高度 */
.my-splide {
  height: 300px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.slide-content {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border-radius: 10px;
}
</style>