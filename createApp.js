/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express"),path = require('path');
var routerIndex =require('./routes/index');
var swig = require('swig')
var bodyParser = require("body-parser");//解析req.body
var multer = require('multer');//解析req.body
var ueditor = require('ueditor');
var path = require('path');
var cookie = require('cookie-parser')
//中间件express的建立
function createApp(){
    var app = express();
    app.use(cookie());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    //app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    //    // ueditor 客户发起上传图片请求
    //    if(req.query.action === 'uploadimage'){
    //        var foo = req.ueditor;
    //        var date = new Date();
    //        var imgname = req.ueditor.filename;
    //
    //        var img_url = '../files/images/ueditor/';
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
    //        res.redirect('/files/js/libs/ueditor/json/ueditor.config.json')
    //}}));
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './files/images');    // 保存的路径，备注：需要自己创建
        },
        filename: function (req, file, cb) {
            var fileformat = (file.originalname).split('.');
            // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
            cb(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);

        }
    });

// 通过 storage 选项来对 上传行为 进行定制化
    var upload = multer({ storage: storage });
//  //多图上传
    app.post('/upload', upload.array('files',20), function(req, res, next){
        console.log(req.files);
        res.send(req.files);
    });
    //app.use(multer());


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