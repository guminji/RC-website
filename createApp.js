/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express"),path = require('path');
var routerIndex =require('./routes/index');
var swig = require('swig')
var bodyParser = require("body-parser");//解析req.body
var multer = require('multer');//解析req.body

//中间件express的建立
function createApp(){
    var app = express();
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer());

    //swig模板引擎设置
    swig.setDefaults({
        varControls: ['{=', '=}'],
        cache: false
    });
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    //swig渲染页面时获取文件的路径 从根目录的views文件下寻找html文件
    app.set('views', path.join(__dirname, 'views'));
    //静态文件访问地址 比如js css html
    app.use('/files',express.static(path.join(__dirname,'files')));
    //设置app的路由
    app.use(routerIndex);
    return app;
}

module.exports={
    createApp:createApp
}