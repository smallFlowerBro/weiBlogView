import Cookies from "js-cookie"

const TOKEN_KEY = "Authorization";

export function getToken(){
    return Cookies.get(TOKEN_KEY)
}


// expires: 1 表示 1 天后过期
export function setToken(value="",expires=1){
    Cookies.set(TOKEN_KEY,value,expires);
}

export  function removeToken(){
    Cookies.remove(TOKEN_KEY);
}