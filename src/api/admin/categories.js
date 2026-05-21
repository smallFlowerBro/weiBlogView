import {setApi} from "@/api/index.js";
import fetch from "@/lib/fetch/index.js";

let api = setApi({
    //查询轮播信息
    wb2db_create_category:{
        api:"/api/categories/wb2db_create_category",
        mock:"/mock/wb2db_create_category.json"
    },
    //更新指定id分类信息
    wb2db_update_category:{
        api:"/api/categories/wb2db_update_category",
        mock:"/mock/wb2db_update_category.json"
    },
    //查询分类列表
    wb2db_q_category_list:{
        api:"/api/categories/wb2db_q_category_list",
        mock:"/mock/wb2db_q_category_list.json"
    },
    //删除分类
    wb2db_delete_category:{
        api:"/api/categories/wb2db_delete_category",
        mock:"/mock/wb2db_delete_category.json"
    },
    //批量删除指定id分类
    wb2db_batch_delete_category:{
        api:"/api/categories/wb2db_batch_delete_category",
        mock:"/mock/wb2db_batch_delete_category.json"
    },
    //交换分类排序
    wb2db_swap_sort:{
        api:"/api/categories/wb2db_swap_sort",
        mock:"/mock/wb2db_swap_sort.json"
    },
})

//生成分类
export  function  createCategory (params={}){
    return fetch.post(api.wb2db_create_category,params)
}
//修改分类
export  function  updateCategory (params={}){
    return fetch.post(api.wb2db_update_category,params)
}
//查询分类列表
export  function  queryCategoryList (params={}){
    return fetch.post(api.wb2db_q_category_list,params)
}
//删除分类
export  function  deleteCategory (params={}){
    return fetch.post(api.wb2db_delete_category,params)
}
//批量删除分类
export  function  batchDeleteCategory (params={}){
    return fetch.post(api.wb2db_batch_delete_category,params)
}
//交换分类排序
export  function  swapSortOrder (params={}){
    return fetch.post(api.wb2db_swap_sort,params)
}

