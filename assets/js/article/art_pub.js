$(function () {
    var form = layui.form
    var layer = layui.layer
    initCate()
    initEditor()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 注册封面点击事件
    $('.btnph').on('click', function () {
        $('#btnFile').click()
    })
    $('#btnFile').on('change', function (e) {
        // 拿到用户选择的文件
        var file = e.target.files
        // 拿到图片的路径
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
        // console.log(art_state);
    })
    art_state = '已发布'
    // 注册form表单监听事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        // 创建一个FormData对象 里边获取到的是表单里边的值
        var fd = new FormData($(this)[0])
        // 向fd 里边追加了一个发布状态
        fd.append('state', art_state)
        // 遍历 fd 里边的内容
        // fd.forEach(function (k, v) {
        //     console.log(k, v);
        // })
        // 将裁剪的图片，转换为一个文件的格式
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交文章失败')
                }
                layer.msg('提交文章成功')
                location.href = '/atricle/art_list.html'
            }
        })
    }
})