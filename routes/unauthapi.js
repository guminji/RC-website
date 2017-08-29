/**
 * Created by guminji on 2017/8/29
 * 不需要验证的接口定义
 */
var express = require('express');
var co = require('co');
var login = require('../auth/login.js');
var auth = require('../auth/auth.js');
var resMsg = require('../config/resCode.json')
router = express.Router();
router.use('/login',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var wherestr = {
        'username' : req.body.username,
        'userpwd': req.body.pwd,
    };
    console.log('wherestr'+req.body.username);
    co(login(wherestr)).then(function(data){

        if(!data){
            let result = JSON.stringify({
                code :10000,
                msg :'账号或者密码输入错误!!!'
            })
            res.end(result)
        }else{
            data.code = 20000
            data = JSON.stringify(data)
            res.end(data);
        }

    })
})
module.exports = router;