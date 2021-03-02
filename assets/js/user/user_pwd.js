$(function () {
    // 自定义规则
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 这里的 value 是指，通过校验规则获取的新密码框里的值
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        // 这里的 value 是指，通过校验规则获取的确认新密码框里的值
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log(123);
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('提交数据失败')
                }
                // console.log(res);
                layui.layer.msg('更新密码成功')
                // console.log(res);

                // 重置  reset 是原生DOM里边的方法
                $('.layui-form')[0].reset()
            }
        })
    })
})