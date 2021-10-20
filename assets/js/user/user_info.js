let form = layui.form
let layer = layui.layer
$(function () {
    

    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return '昵称长度必须在 1 ~ 6 字符之间'
            }
        }
    })
    initUserinfo()
    //重置按钮
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserinfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})

//获取用户基本信息
function initUserinfo() {
    
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // console.log(res)
            //快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    })
}
