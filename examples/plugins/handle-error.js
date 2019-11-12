import httpRequestor from '@external/edu-saas-utils/http_requestor'
import errorCode from '@external/microserver_common/constant/error_code.js'
import Vue from 'vue'
import router from '../router.js'

// 默认请求错误处理
httpRequestor.defaultErrorHandler = (result) => {
    Vue.prototype.$message.error(result.status.message)

    if (!process.env.VUE_APP_IS_PRODUCTION) {
        Vue.prototype.$notify.error({
            title: `错误代码：${result.status.code}`,
            dangerouslyUseHTMLString: true,
            message: `
                <div>
                    <pre>url: ${result.url}</pre>
                    <pre>message: ${result.message}</pre>
                    <pre>debugMessage: ${result.status.debugMessage}</pre>
                </div>
            `,
            position: 'top-left',
            duration: 0,
            customClass: 'debug-notify-class',
        })
    }

    // 登录态失效的统一处理逻辑
    if (result.status.code === errorCode.NOT_SIGNIN || result.status.code === errorCode.NEED_RELOGIN) {
        router.replace({name: 'login'})
    }
}

Vue.config.errorHandler = function (err) {
    Vue.prototype.$message({
        type: 'error',
        message: err.message,
    })
    console.error(err)
}