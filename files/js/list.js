/**
 * Created by guminji on 2017/9/3.
 */
//setTimeout(function(){
//    $.ajax({
//        url:'./unauth/getList',
//        dataType:'json',
//        success:function(data){
//            console.log(data);
//        }
//    })
//},2000)

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        contents:{}
    },
    methods:{
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
        },
        getList:function(){
            var self = this;
            $.ajax({
                url:'./unauth/getList',
                dataType:'json',
                success:function(data){
                    self.contents = data;
                    console.log(data);
                }
            })
        },
        goPublish:function(){
            if(!this.getCookie('token')){
                window.location='./login'
            }else{
                $.ajax({
                    url:'./api/author',
                    dataType:'json',
                    success:function(data){
                        if(data.code == 20000){
                            window.location= './publish'
                        }
                        else{
                            window.location='./login'
                        }
                    }
                })
            }
            //console.log(this.getCookie('token'));

            //window.location ='./publish'
        }
    },
    created: function() {
        this.getList();
    },

})