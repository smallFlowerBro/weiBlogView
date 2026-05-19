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
    },
    //新建tag标签
    wb2db_create_tag:{
        api:"/api/tags/wb2db_create_tag",
        mock:"/mock/wb2db_create_tag.json"
    },
    //修改标签
    wb2db_update_tag:{
        api:"/api/tags/wb2db_update_tag",
        mock:"/mock/wb2db_update_tag.json"
    },
    //删除标签
    wb2db_delete_tag:{
        api:"/api/tags/wb2db_delete_tag",
        mock:"/mock/wb2db_delete_tag.json"
    },
    //批量删除标签
    wb2db_batch_delete_tag:{
        api:"/api/tags/wb2db_batch_delete_tag",
        mock:"/mock/wb2db_batch_delete_tag.json"
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
//新建标签
export  function  wb2db_create_tag(params={}){
    return fetch.post(api.wb2db_create_tag,params)
}
//修改标签
export  function  wb2db_update_tag(params={}){
    return fetch.post(api.wb2db_update_tag,params)
}
//删除标签
export  function  wb2db_delete_tag(params={}){
    return fetch.post(api.wb2db_delete_tag,params)
}
//批量删除标签
export  function  wb2db_batch_delete_tag(params={}){
    return fetch.post(api.wb2db_batch_delete_tag,params)
}