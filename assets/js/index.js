
$(function () {
    getUserInfo()
    //退出按钮动作
    $('#btnlogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/web_bigevent/login.html'

            layer.close(index);
        });
    })
})



// 获取用户列表方法
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //统一在bassAPI.js中
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res)
            renderAvatar(res.data)

        },
        //统一在bassAPI.js中
        // complete: function (res) {
        //     console.log('ok')
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/web_bigevent/login.html'
        //     }
        // }
    })
}
//渲染图片头像和文字头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').arrt('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}