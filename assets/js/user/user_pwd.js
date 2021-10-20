$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return '新密码和原密码不能相同！'
            }
        },
        repwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功！')
                // 清空密码表单
                $('.layui-form')[0].reset()
            }
        })
    })
})