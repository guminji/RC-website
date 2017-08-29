/**
 * Created by guminji on 2017/2/24.路由文件
 */
var express = require("express");
var router = express.Router();
//页面的访问路由
router.use(require('./pages'));
//中间件所有/api开头的请求都需要先经过一层token验证
router.use(require('./auth'));
//不需要验证的接口路由
router.use('/unauth',require('./unauthapi'));
//需要验证的入口
router.use('/api',require('./authapi'));
router.use('/api/getUserInFo',function(req,res){
    res.end('123');
});
module.exports = router;