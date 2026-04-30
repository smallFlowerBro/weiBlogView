import {defineStore} from "pinia";
import {removeToken,setToken} from "@/lib/auth/index.js";
import {loginByNameAndPwd} from "@/api/admin/user.js";
export const userStore = defineStore("user",{

    state:()=>({
        //公共变量
    }),
    getters:()=>({
        //计算变量
    }),
    actions:{
        //登录
        async login(params){
            //
            return await loginByNameAndPwd(params).then((result)=>{
                //登陆成功
                let token = result.token;
                setToken(token);
                return true
            },(error)=>{
                //登录失败
                return false
            })
        },
        //退出
        logout(){
            //清楚token
            removeToken()
        }
    }


})