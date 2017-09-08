/**
 * Created by guminji on 2017/9/1.
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
document.getElementsByClassName('loginbtn')[0].onclick= function(){
    $.ajax({
        url:'./unauth/sign',
        type:'post',
        data:{
            username:$('#username').val(),
            userpwd:$('#password').val()
        },
        dataType:'json',
        success:function(res){
            alert(res.msg);
            //token = res.token;
            //if(res.code ===20000){
            //    //token = res.token;
            //    alert('登录成功!')
            //}else{
            //    alert(res.msg);
            //}
        }
    })

}
$('#signup').on('click',function(){
    //window.location = './signup'
    $.ajax({
        url:'./api/getUserInFo',
        type:'get',
        dataType:'json',
        data:{
            token:token,
        },
        success:function(res){
            if(res.code==20000){
                alert('调用成功 token验证成功!');
            }
            else{
                alert(res.msg)
            }
        }
    })
})