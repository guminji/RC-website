/**
 * Created by guminji on 2017/8/29.
 * 中间件 用于验证需要token的接口
 */

var express = require('express');
var co = require('co');
var login = require('../auth/login.js');
var auth = require('../auth/auth.js');
var resMsg = require('../config/resCode.json')
router = express.Router();
router.use('/api',function(req,res,next){
    var result = auth(req.cookies.token);
    if(result.code ==20000){
        next();
    }else{
        var response = {
            code:result.code,
            msg:resMsg[result.code]
        }
        response = JSON.stringify(response);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(response);
    }
});
module.exports = router;