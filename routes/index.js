/**
 * Created by guminji on 2017/2/24.路由文件
 */
var express = require("express");
var router = express.Router();
var ueditor = require('ueditor');
var path = require('path');
//页面的访问路由
router.use(require('./pages'));
//中间件所有/api开头的请求都需要先经过一层token验证
router.use(require('./auth'));
//不需要验证的接口路由
router.use('/unauth',require('./unauthapi'));
//需要验证的入口
router.use('/api',require('./authapi'));
//router.use('/api/getUserInFo',function(req,res){
//    res.end('123');
//});
//上传图片
//router.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
//    // ueditor 客户发起上传图片请求
//    if(req.query.action === 'uploadimage'){
//        var foo = req.ueditor;
//        var date = new Date();
//        var imgname = req.ueditor.filename;
//
//        var img_url = '/images/ueditor/';
//        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//    }
//    //  客户端发起图片列表请求
//    else if (req.query.action === 'listimage'){
//        var dir_url = '/images/ueditor/';
//        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
//    }
//    // 客户端发起其它请求
//    else {
//        res.setHeader('Content-Type', 'application/json');
//        res.redirect('/ueditor/ueditor.config.json')
//}}));
module.exports = router;