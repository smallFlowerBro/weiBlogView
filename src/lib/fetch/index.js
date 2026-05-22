import axios from "axios";
import {getToken,removeToken} from "@/lib/auth/index.js";
import globalConfig from "@/globalConfig.js";

let axios_instance = axios.create({
    timeout:90000,
    baseURL:"",
    headers:{
        post:{
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Accept"      : "application/json"
        }
    }
})

// 设置请求前拦截
axios_instance.interceptors.request.use(function (config){
    const token = getToken();
    if(token){
        config.headers["Authorization"]  ="Bearer "+ token;
    }
    return config;
},function (error){
    return Promise.reject(error);
})
//响应拦截
axios_instance.interceptors.response.use(function (response){
    // 对响应数据做点什么
    return response.data;
},function (error){
    // 网络错误或请求未发出（无 response 对象）
    if (!error.response) {
        return Promise.reject({ code: -1, msg: '网络异常，请检查连接' });
    }

    let status = error.response.status
    if (status === 401 || status === 403) {
        removeToken();
        return Promise.reject({ code: status, msg: '登录已过期，请重新登录' });
    }

    let message = error.response.data?.message || '请求失败'
    return Promise.reject({ code: status, msg: message });
})



//post 方法
function post (url,params){

    return new Promise((resolve,reject)=>{
        let method = axios_instance.post;

        if(globalConfig.api_mode =="MOCK"){
            method = axios_instance.get
        }

        method(url,params).then((result)=>{
            if(result.code == "0"){
                resolve(result.data)
            }else{
                reject({
                    code : result.code,
                    msg  : result.msg
                })
            }
        },(error)=>{
            reject({
                code: -1,
                msg:error.toString()||"请求异常"
            });
        }).catch((error)=>{
            reject({
                code:"-1",
                msg: error?.msg||"请求出错"
            })
        })
    })
}

//get 方法
function get(url,params){
    return new Promise((resolve,reject)=>{
        let method = axios_instance.get;
        method(url,params).then((result)=>{
            if(result.code == "0"){
                resolve(result.data)
            }else{
                reject({
                    code : result.code,
                    msg  : result.msg
                })
            }
        },(error)=>{
            reject({
                code: -1,
                msg:error.toString()||"请求异常"
            });
        }).catch(error=>{
            reject({
                code:"-1",
                msg: error?.msg||"请求出错"
            })
        })
    })
}
let fetch ={
    post,
    get

}
export default fetch
