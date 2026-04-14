import axios from "axios";
import {getToken} from "@/lib/auth/index.js";
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
        config.headers["Authorization"]  = token;
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
    // 对响应错误做点什么
    let status = error.response.status
    console.log('错误响应==========》' + status)
    if (status == 401 || status == 402) {
        console.log('401-------------')
        //store.dispatch('logout').finally(() => location.reload())
    }

    let isSuccess = error.response.data.success
    console.log('错误响应==========》' + isSuccess)
    if (!isSuccess) {
        console.log('error: ' + error.response.data.message)
        let message = error.response.data.message || '请求失败'

        // todo 失效的情况
        // notification(message, 'error')
        // showMessage(messsage, 'error')
    }

    return Promise.reject(error);
})



//post 方法
function post (url,params){

    if (url.indexOf("[SOCKETIOERROR]") > -1) {
        return Promise.reject({
            code: "-1",
            msg: "数据服务网络异常",
        })
    }
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
                msg: ""
            })
        })
    })
}

//get 方法
function get(url,params){
    if (url.indexOf("[SOCKETIOERROR]") > -1) {
        return Promise.reject({
            code: "-1",
            msg: "数据服务网络异常",
        })
    }
    return new Promise((resolve,reject)=>{

        let method = axios_instance.get;
        method(url,params).then((result)=>{
            resolve(result);
        },(error)=>{
            reject(error);
        })
    })
}
let fetch ={
    post,
    get

}
export default fetch
