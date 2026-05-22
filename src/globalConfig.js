//全局开关配置（通过 .env.development / .env.production 注入）
let globalConfig = {

    api_mode: import.meta.env.VITE_API_MODE ?? "MOCK",      // api请求模式 MOCK 模拟数据  API 真实请求模式
    base_url: import.meta.env.VITE_BASE_URL ?? "",           // 请求地址

}
export default globalConfig;