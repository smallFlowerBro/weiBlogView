import globalConfig from "@/globalConfig.js";

let apiConfig={
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
    web2db_q_article_detail:{
        api:"/api/article/web2db_q_article_detail",
        mock:"/mock/web2db_q_article_detail.json"
    }


}


let __api__ = {}

Object.keys(apiConfig).forEach((item)=>{
    if(globalConfig.api_mode=="API"){
        //后端请求模式
        __api__[item]  = globalConfig.base_url+apiConfig[item].api;

    }else{
        //模拟报文
        __api__[item]  = apiConfig[item].mock;
    }

})

let api = __api__
export default api;