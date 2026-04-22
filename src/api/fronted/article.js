import {setApi} from "@/api/index.js";
import fetch from "@/lib/fetch/index.js";

let api = setApi({
    //查询轮播信息
    wb2db_q_slide_contents:{
        api:"/api/article/hot",
        mock:"/mock/wb2db_q_slide_contents.json"
    },
    // 查询文章列表
    wb2db_q_article_list:{
        api:"/api/article/wb2db_q_article_list",
        mock:"/mock/wb2db_q_article_list.json"
    },
    // 查询文章内容
    wb2db_q_article_detail:{
        api:"/api/article/web2db_q_article_detail",
        mock:"/mock/web2db_q_article_detail.json"
    }
})

//获取文章内容
export  function  getArticleDetail (params={}){
    return fetch.post(api.wb2db_q_article_detail,params)
}

//获取轮播信息
export function  getSideList(params={}){
    return fetch.post(api.wb2db_q_slide_contents,params)
}

//获取热门文章
export function getHotArticlesList (params){
    return  fetch.post(api.wb2db_q_article_list,params)
}
//通过条件获取文章
export function queryArticles (params){
    return  fetch.post(api.wb2db_q_article_list,params)
}
//通过条件cha