$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 密码 确认密码校验规则
    let form = layui.form
    let leyer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })
    // 注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name = "username"]').val(), password: $('#form_reg [name = "password"]').val()
        }, function (res) {
            if (res.status !== 0) { return leyer.msg(res.message) }
            leyer.msg(res.message)
            $('#link_login').click()
        })
    })
    // 登录表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { return layer.msg(res.message) }
                layer.msg(res.message)
                // console.log(res.token)
                // 本地存储token
                localStorage.setItem('token',res.token)
                location.href='/web_bigevent/index.html'
            }
        })
    })

})