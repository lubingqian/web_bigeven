$(function () {
    // 调用getUserInfo() 获取用户信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogin').on('click', function () {
        // console.log(123);
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //    1.清除本地缓存
            localStorage.removeItem('token')
            // 2.退到index页面
            location.href = 'login.html'
            layer.close(index);

        });

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            console.log(res);
            // console.log(res);
            readerAvatra(res.data)
        },
        //     // 控制用户不输入账号密码时，直接进入后台页面
        //     // 这里用 complete 这个回调函数，是应为ajax与接口发生交互是都会调用complete这个函数
        // complete: function (res) {
        // console.log(res);
        //         if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //             // 1.清空本地存储的token
        //             localStorage.removeItem('token')
        //             // 2.强制跳转连接
        //             location.href = '/login.html'
        // }
        // }
    })
}
// 渲染用户头像
function readerAvatra(user) {
    // 1.接收name是管理员还是普通用户
    var name = user.nickname || user.username
    // 2.设置欢迎
    $('.welcome').html('&nbsp;&nbsp;' + name)
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 用户上传了头像，渲染上传的头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 用户没有上传头像，渲染自定义的
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }

}