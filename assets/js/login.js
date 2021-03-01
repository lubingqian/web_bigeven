$(function () {
    // 点击去注册页面
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录页面
    $('#link-login').on('click', function () {
        console.log(123);
        $('.reg-box').hide()
        $('.login-box').show()
    })


    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //  校验两次密码是否一致的规则
        // 通过形参value拿到的是确认密码中的内容
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一样'
            }
        }
    })

    // 监听表单事件

    $('#form_reg').on('submit', function (e) {

        // console.log(123);
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()

        }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                $('#link-login').click()
            })
    })
    // 监测登录事件
    $('#form_login').submit(function (e) {
        console.log(123);
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res);
                // 将获取到了res里边的token存储到本地
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})