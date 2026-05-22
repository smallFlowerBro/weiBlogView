import {defineStore} from "pinia";
import {removeToken,setToken} from "@/lib/auth/index.js";
import {loginByNameAndPwd} from "@/api/admin/user.js";
import router from "@/router/index.js";
export const userStore = defineStore("user",()=>{


        //方法
        //登录
        async function  login(params){
            //
            return await loginByNameAndPwd(params).then((result)=>{
                //登陆成功
                let token = result.token;
                setToken(token);
                return true
            },(error)=>{
                //登录失败
                removeToken()
                return false
            })
        }


        //退出
        function logout(){
            //清楚token
            removeToken()
            router.push("/login")
        }
    return {
        logout,
        login
    }


})