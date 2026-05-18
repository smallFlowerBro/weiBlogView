import {setApi} from "@/api/index.js";
import fetch from "@/lib/fetch/index.js";

let api = setApi({
    //查询标志信息
    wb2db_q_tags_info:{
        api:"/api/tags/wb2db_q_tags_info",
        mock:"/mock/wb2db_q_tags_info.json"
    },
    //根据关键词检索标签
    wb2db_q_tags_list:{
        api:"/api/tags/wb2db_q_tags_list",
        mock:"/mock/wb2db_q_tags_list.json"
    }


})


// 查询标志信息
export  function  wb2db_q_tags_info (params={}){
    return fetch.post(api.wb2db_q_tags_info,params)
}
// 查询标签列表
export  function  wb2db_q_tags_list (params={}){
    return fetch.post(api.wb2db_q_tags_list,params)
}