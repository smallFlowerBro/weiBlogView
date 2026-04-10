<template>
    <main>
    <div class="container">
        <div class="lab-header">
            <h1>⚡ 灵感实验室</h1>
            <p>探索前沿创意 · 实验性交互 · 技术游乐场</p>
        </div>

        <!-- 特色互动预览区 (科技感小demo) -->
        <div class="feature-preview">
            <h2>🎨 实时配色实验</h2>
            <p style="color: var(--text-muted);">点击下方色块，感受科技蓝渐变魅力</p>
            <div class="preview-demo">
                <div class="color-preview" id="colorDemo">
                    <div class="color-box" style="background-color: #2b6ef0;"></div>
                    <div class="color-box" style="background-color: #5b8ef5;"></div>
                    <div class="color-box" style="background-color: #1a4fcf;"></div>
                    <div class="color-box" style="background-color: #7eaeff;"></div>
                </div>
                <p id="colorFeedback">✨ 点击色块，复制色值 (演示模式)</p>
            </div>
        </div>

        <!-- 实验卡片网格 -->
        <div class="experiments-grid">
            <!-- 卡片 1 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-code"></i></div>
                <h3>代码沙盒</h3>
                <p>在线实时编辑 Vue / React 组件，即时预览效果，支持多文件实验。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">开始实验 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 2 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-palette"></i></div>
                <h3>AI 配色工具</h3>
                <p>智能生成科技感调色板，一键导出 Tailwind 配置，设计系统助手。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">探索色彩 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 3 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-cube"></i></div>
                <h3>3D 粒子背景</h3>
                <p>基于 Three.js 的动态粒子系统，可自定义颜色、密度与运动轨迹。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">沉浸体验 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 4 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-markdown"></i></div>
                <h3>实时 Markdown 预览</h3>
                <p>分屏编辑器，支持 GitHub 风格 Markdown，导出 HTML/PDF。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">开始写作 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 5 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-css3-alt"></i></div>
                <h3>CSS 生成器</h3>
                <p>可视化调整阴影、圆角、渐变，实时生成代码片段，复制即用。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">设计样式 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 6 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fab fa-vuejs"></i></div>
                <h3>Vue 组件游乐场</h3>
                <p>在线组合式 API 演示，支持 props 动态注入与响应式调试。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">试玩组件 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 7 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-moon"></i></div>
                <h3>暗色模式调试器</h3>
                <p>模拟不同设备与对比度，测试主题变量对 UI 的影响。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">切换调试 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- 卡片 8 -->
            <div class="exp-card">
                <div class="card-icon"><i class="fas fa-font"></i></div>
                <h3>字体排印实验室</h3>
                <p>调整字重、行高、字距，实时预览最佳阅读体验。</p>
                <div class="card-footer">
                    <a href="#" class="exp-btn">调节字体 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script setup>
import { onMounted } from 'vue';

    onMounted(() => { 
        // 返回首页演示
        const backBtn = document.getElementById('backHomeBtn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('✨ 返回首页 (演示模式)');
            });
        }

        // 特色预览区: 色块点击演示 (科技感反馈)
        const colorBoxes = document.querySelectorAll('.color-box');
        const colorFeedback = document.getElementById('colorFeedback');
        colorBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const bgColor = box.style.backgroundColor;
                showToast(`🎨 色值 ${bgColor} 已复制 (演示)`);
                colorFeedback.textContent = `✨ 你点击了 ${bgColor} — 可在真实项目中应用`;
                setTimeout(() => {
                    colorFeedback.textContent = `✨ 点击色块，复制色值 (演示模式)`;
                }, 2000);
            });
        });

        // 所有实验按钮演示toast
        const expBtns = document.querySelectorAll('.exp-btn');
        function showToast(msg) {
            let toast = document.querySelector('.lab-toast');
            if (toast) toast.remove();
            toast = document.createElement('div');
            toast.className = 'lab-toast';
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
            toast.style.fontFamily = 'Inter, sans-serif';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 4px 12px var(--tech-glow)';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }

        expBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const cardTitle = btn.closest('.exp-card')?.querySelector('h3')?.innerText || '实验';
                showToast(`🔬 演示模式：即将进入「${cardTitle}」`);
            });
        });
    
    });
</script>

<style lang="css" scoped>
/* 页面头部区域 */
    .lab-header {
        text-align: center;
        margin: 2.5rem 0 2rem;
    }
    .lab-header h1 {
        font-size: 2.2rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--text-primary), var(--tech-blue));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 0.5rem;
    }
    .lab-header p {
        font-size: 1.1rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
    }

    /* 实验卡片网格 */
    .experiments-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin: 2rem 0 4rem;
    }

    /* 科技感卡片 */
    .exp-card {
        background: var(--bg-card);
        border-radius: 1.25rem;
        border: 1px solid var(--border-light);
        overflow: hidden;
        transition: all 0.35s cubic-bezier(0.2, 0, 0, 1);
        box-shadow: var(--shadow-sm);
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .exp-card:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-hover);
        border-color: var(--tech-blue-light);
    }
    .card-icon {
        font-size: 2.8rem;
        color: var(--tech-blue);
        padding: 1.5rem 1.5rem 0 1.5rem;
    }
    .exp-card h3 {
        font-size: 1.4rem;
        font-weight: 700;
        padding: 0 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    .exp-card p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        padding: 0 1.5rem;
        line-height: 1.5;
        flex: 1;
    }
    .card-footer {
        padding: 1.2rem 1.5rem 1.5rem;
        border-top: 1px solid var(--border-light);
        margin-top: 1rem;
    }
    .exp-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--bg-soft);
        color: var(--tech-blue);
        padding: 0.5rem 1.2rem;
        border-radius: 40px;
        font-size: 0.8rem;
        font-weight: 600;
        text-decoration: none;
        transition: 0.25s;
        border: 1px solid transparent;
    }
    .exp-btn:hover {
        background: var(--tech-blue);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--tech-glow);
    }

    /* 特色功能预览区 (小型demo) */
    .feature-preview {
        background: var(--bg-card);
        border-radius: 1.5rem;
        border: 1px solid var(--border-light);
        padding: 2rem;
        margin-bottom: 3rem;
        text-align: center;
        box-shadow: var(--shadow-sm);
    }
    .feature-preview h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    .preview-demo {
        margin: 1.5rem auto;
        max-width: 400px;
        background: var(--bg-soft);
        border-radius: 1rem;
        padding: 1rem;
        border: 1px dashed var(--tech-blue);
    }
    .color-preview {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
    }
    .color-box {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        transition: 0.2s;
        cursor: pointer;
        border: 1px solid var(--border-light);
    }
    .color-box:hover {
        transform: scale(1.05);
    }
    .preview-demo p {
        margin-top: 0.8rem;
        font-size: 0.8rem;
        color: var(--text-muted);
    }

    /* 返回首页链接 */
    .back-home {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0 0.5rem;
        color: var(--tech-blue);
        text-decoration: none;
        font-weight: 500;
    }
    .back-home:hover {
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        .container {
            padding: 0 1.2rem;
        }
        .lab-header h1 {
            font-size: 1.8rem;
        }
        .experiments-grid {
            gap: 1.5rem;
        }
        .feature-preview {
            padding: 1.5rem;
        }
    }
    @media (max-width: 640px) {
        .experiments-grid {
            grid-template-columns: 1fr;
        }
    }
</style>