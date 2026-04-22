//请求相关
import UUIDManager from "@/lib/utils/index.js";
//markdown相关
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from "highlight.js";
import markdownItToc from "@/plugin/markdownItToc.js";
export function createMD(){
    let md = new MarkdownIt({
        html: true,        // 允许HTML标签
        linkify: true,     // 自动识别URL
        typographer: true, // 启用一些语言中性替换
        breaks: true,       // 将换行符转换为<br>
        highlight: function (str, lang) {
            // 如果指定了语言且 highlight.js 支持该语言
            if (lang && hljs.getLanguage(lang)) {
                try {
                    //返回高亮后的 HTML
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

    return md;

}