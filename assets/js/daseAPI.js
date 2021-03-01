$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    if (option.url.indexOf('/my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // // 全局统一挂载 complete函数
    // // 控制用户不输入账号密码时，直接进入后台页面
    // // 这里用 complete 这个回调函数，是应为ajax与接口发生交互是都会调用complete这个函数
    // option.complete = function (res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // 1.清空本地存储的token
    //         localStorage.removeItem('token')
    //         // 2.强制跳转连接
    //         location.href = '/login.html'
    //     }
    // }
})