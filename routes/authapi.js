/**
 * Created by guminji on 2017/8/29.api接口定义
 */
var express = require('express');
var co = require('co');
var login = require('../auth/login.js');
var auth = require('../auth/auth.js');
var resMsg = require('../config/resCode.json')
router = express.Router();
router.use('/aaa',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var wherestr = {
        'username' : req.body.username,
        'userpwd': req.body.pwd,
    };
    //console.log('wherestr'+req.body.username);
    co(login(wherestr)).then(function(data){

        if(!data){
            let result = JSON.stringify({
                code :10000,
                msg :'账号或者密码输入错误!!!'
            })
            res.end(result)
        }else{
            res.end(data);
        }
    })
});
router.use('/getUserInFo',function(req,res){
    res.end(JSON.stringify({
        code:20000,
    }));
});
module.exports = router;