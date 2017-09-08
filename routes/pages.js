/**
 * Created by guminji on 2017/8/29.
 */
//页面的访问路径
var express = require('express');
router = express.Router();
//登录页面
router.use('/login',function(req,res){
    res.render('./login');
})

router.use('/peruims',function(req,res){
    res.render('./peruims');
})
//注册文件
router.use('/signup',function(req,res){
    res.render('./signup');
})
//发布帖子
router.use('/publish',function(req,res){
    res.render('./publish');
})
//帖子列表
router.use('/list',function(req,res){
    res.render('./list');
})
module.exports = router;