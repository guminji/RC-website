/**
 * Created by guminji on 2017/6/4.
 */
var token ='';
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        pictures:{
            pictures1:"./files/images/pets1.jpeg",
            pictures2:"./files/images/pets2.jpeg",
            pictures3:"./files/images/pets3.jpeg",
            pictures4:"./files/images/pets4.jpeg",
        },
        methods: {
            //设置cookie
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + cvalue + "; " + expires);
                document.cookie = cname + "=" + cvalue + "; " + expires;
                console.info(document.cookie);
            },
            //获取cookie
            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie("username", "", -1);

            },
            checkCookie: function () {
                var user = this.getCookie("username");
                if (user != "") {
                    alert("Welcome again " + user);
                } else {
                    user = prompt("Please enter your name:", "");
                    if (user != "" && user != null) {
                        this.setCookie("username", user, 365);
                    }
                }
            }
        }
    }
})
document.getElementsByClassName('loginbtn')[0].onclick= function(){
    $.ajax({
        url:'./unauth/login',
        type:'post',
        data:{
            username:$('#username').val(),
            pwd:$('#password').val()
        },
        dataType:'json',
        success:function(res){
            token = res.token;
            //app.methods.setCookie('token',token);
            if(res.code ===20000){
                //token = res.token;
                app.methods.setCookie('token',token);
                alert('登录成功!')
                window.location = './list';
            }else{
                alert(res.msg);
            }
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