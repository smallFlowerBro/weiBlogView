import {defineStore} from "pinia";
import {removeToken,setToken} from "@/lib/auth/index.js";
import {loginByNameAndPwd} from "@/api/admin/user.js";
import {useRouter} from "vue-router";
export const userStore = defineStore("user",()=>{

        //公共变量
        let router = useRouter();


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