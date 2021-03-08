$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据，默认每页显示2条
        cate_id: '',  // 文章分类的  id
        state: ''  // 文章的发布状态
    }
    initTable()
    function initTable() {

        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表数据失败')
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                readerPage(res.total)
            }
        })
    }

    initCate()
    // 定义美化时间的过滤器
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }
    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date()
        var d = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var dd = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return d + '-' + m + '-' + dd + '  ' + hh + ':' + mm + ':' + ss
    }

    //  通过状态查询文章内容，渲染到页面
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类信息失败')
                }
                // layer.msg('获取分类信息成功')
                console.log(res);
                var htmlStr1 = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr1)
                // 通知layui重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    // 筛选按钮
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    // 根据文章的总分 分页
    function readerPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 当用户点击切换时，会触发jump这个函数
            jump: function (obj, first) {
                // console.log(obj.curr);
                // console.log(first);

                // 把最新的页码数赋值给最初的页码数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    // 注册删除事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr(data - id)
        // console.log(122);
        var len = $('.btn-delete').length
        console.log(len);
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }

            })
            layer.close(index);

        });

    })
})