/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express");
var router = express.Router();
var User = require("../dataController/user.js");
//首页路由
router.use('/RC',function(req,res){
    console.log(1);
    res.render('./layout')
})
//注册请求
router.use('/informations',function(req,res){
    //var id = '598412177a8c720ee3aa7c6e1';
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    //var wherestr = {'username' : req.body.username};
    var wherestr = {'username' : req.body.username};

    User.find(wherestr, function(err, res2){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log('none');
            console.log('res2'+res2);
            if(!res2.length){
                console.log('none1');
                var user = new User({
                    username : req.body.username,                 //用户账号
                    userpwd: req.body.pwd,                            //密码
                    userage: 37,                                //年龄
                    logindate : new Date()                      //最近登录时间
                });

                user.save(function (err, res3) {

                    if (err) {
                        console.log("Error:" + err);
                    }
                    else {
                        //console.log('none2');
                        res.end(JSON.stringify({code:20000,Msg:'注册成功!!!'}))
                        //console.log("Res:" + res3);
                    }

                });
            }else{
                var rr = {code:50000,Msg:'用户名已经被注册!!!'};
                res.end(JSON.stringify(rr));
            }
            console.log("Res:" + res2);
        }
    })

    /*User.findById(id, function(err, res2){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res2);
            res.end(res2.toString());
        }
    })*/
    //console.log(req.body);
})
module.exports = router;