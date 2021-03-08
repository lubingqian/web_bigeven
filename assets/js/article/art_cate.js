$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtcateList()
    // alert(123)
    // 获取动态数据，渲染到页面中
    function initArtcateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 点击添加类别，添加文章
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '在线调试'
            , content: $('#dialog-add').html()
        });
    })




    // 通过代理  的形式为 form-add 注册submit事件
    $('body').on('submit', '#form-add', function (e) {
        console.log(123);
        e.preventDefault()
        // console.log(123);
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章失败')
                }
                initArtcateList()
                layer.msg('添加文章成功')
                // 通过打开时返回的索引号关闭弹出层
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    // 为 编辑按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault()
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '在线调试'
            , content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    //   绑定 编辑里的确认修改事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(123);
                if (res.status !== 0) {
                    return layer.msg('修改数据失败')
                }
                layer.msg('修改成功')
                layer.close(indexEdit)
                initArtcateList()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        // console.log(123);
        var id = $(this).attr('data-id')
        // 提示用户是否要删除文件
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index)
                    initArtcateList()
                }
            })

        })
    })
})
