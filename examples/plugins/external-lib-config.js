import httpRequestor from '@external/edu-saas-utils/http_requestor'

/**
 * 设置 api 请求的地址
 * 这个地址为两部分
 * 1：https://dev.xiaojing0.com // 这是域名
 * 2：manager_api // 这是入口名+api，入口名从 entry_info 可以找到
 */
httpRequestor.baseURL = process.env.VUE_APP_API_BASE_URL
// 本地调试需要跨域
httpRequestor.withCredentials = true