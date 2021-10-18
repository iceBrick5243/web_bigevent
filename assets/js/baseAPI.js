
$.ajaxPrefilter(function (options) {

    //拼接接口根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // options.url = 'http://127.0.0.1:3007' + options.url

    //统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //统一设置访问权限
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/web_bigevent/login.html'
        }
    }

})