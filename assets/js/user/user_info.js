$(function () {
    // 获取表单信息
    var form = layui.form
    var layer = layui.layer
    // 指定用户昵称的校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1~6 之间'
            }
        }
    })
    initUserInfo()

    // 获取用户的基本信息，初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // console.log(res);
                // 快速为表单赋值，这里用到了 form.val('filter', object)这个方法
                form.val('formUserInfo', res.data)
            }
        })
    }

    //  重置操作
    $('#btnReset').on('click', function (e) {
        console.log(123);
        // console.log(123);
        // 阻止表单默认提交行为
        e.preventDefault()
        // 重新获取初始化信息
        initUserInfo()
        // getUserInfo()

    })

    //  监听表单提交数据
    $('.layui-form').on('click', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                $('#btnChange').on('click', function () {
                    layer.msg('修改成功')
                    window.parent.getUserInfo()
                })
            }
        })
    })
})

