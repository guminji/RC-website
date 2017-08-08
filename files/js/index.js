/**
 * Created by guminji on 2017/6/4.
 */

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        pictures:{
            pictures1:"./files/images/pets1.jpeg",
            pictures2:"./files/images/pets2.jpeg",
            pictures3:"./files/images/pets3.jpeg",
            pictures4:"./files/images/pets4.jpeg",
        }
    }
})
document.getElementById('register').onclick= function(){
    $.ajax({
        url:'./informations',
        type:'post',
        data:{
            username:$('#username').val(),
            pwd:$('#password').val()
        },
        success:function(res){
            var res = JSON.parse(res);
            if(res.code ===20000){
                alert('注册成功!')
            }else{
                alert('已被注册!!')
            }
        }
    })
}