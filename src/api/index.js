import globalConfig from "@/globalConfig.js";
export  const setApi = function (apiConfig){

    let __api__ = {}

    Object.keys(apiConfig).forEach((item)=>{
        if(globalConfig.api_mode==="API"){
            //后端请求模式
            __api__[item]  = globalConfig.base_url+apiConfig[item].api;

        }else{
            //模拟报文
            __api__[item]  = apiConfig[item].mock;
        }

    })
    return __api__;
}