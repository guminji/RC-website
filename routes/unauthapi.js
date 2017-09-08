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
//登录接口
router.use('/login',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var wherestr = {
        'username' : req.body.username,
        'userpwd': req.body.pwd,
    };
    console.log('wherestr'+req.body.username);
    co(login(wherestr,'users')).then(function(data){
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
//注册接口
router.use('/sign',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var sign = require('../auth/sign');
    var wherestr = {
        'username' : req.body.username,
        'userpwd': req.body.userpwd,
    };
    sign = new sign(wherestr);
    co(sign(wherestr)).then(function(data){
        res.end(JSON.stringify(data));
    })
})
//发布帖子接口
router.use('/publish',function(req,res){
    var request = require('request');
    var pub = function* (){
        //var mg = require('../model/mongodb')
        var saveResult =yield mgdb.saveDB({
            photos:req.body.photos,
            content:req.body.content,
            title:req.body.title
        },'publishs');
        return saveResult;
    }
    co(pub).then(function(data){
        res.end(JSON.stringify(data));
    })
})
//获取帖子列表接口
router.use('/getList',function(req,res){
    var pub = function* (){
        var list =yield mgdb.queryDB({},'publishs');
        return list;
    }
    co(pub).then(function(data){
        res.end(JSON.stringify(data));
    })
})
module.exports = router;