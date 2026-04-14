import globalConfig from "@/globalConfig.js";

let apiConfig={
    //查询轮播信息
    wb2db_q_slide_contents:{
        api:"/api/article/hot",
        mock:"/mock/wb2db_q_slide_contents.json"
    },
    // 查询文章内容
    wb2db_q_article_content:{
        api:"/api/article/wb2db_q_article_content",
        mock:"/mock/wb2db_q_article_content.json"
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