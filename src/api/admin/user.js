import {setApi} from "@/api/index.js";
import fetch from "@/lib/fetch/index.js";

let api = setApi({
    //查询轮播信息
    wb2db_admin_login:{
        api:"/api/auth/login",
        mock:"/mock/wb2db_admin_login.json"
    }
})

//获取文章内容
export  function  loginByNameAndPwd (params={}){
    return fetch.post(api.wb2db_admin_login,params)
}

