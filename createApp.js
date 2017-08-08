/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express"),path = require('path');
var routerIndex =require('./routes/index');
var swig = require('swig')
var User = require("./dataController/user.js");
var bodyParser = require("body-parser");

/**
 * 插入
 */
/*function insert() {

    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });
    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();*/

//var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/local',{useMongoClient: true});
//mongoose.connection.on('connected', function () {
//    console.log('Mongoose connection open to realUrl');
//});
//var UsersSchema = new mongoose.Schema({
//    _id: String,
//    hostname: String,
//    meta: {
//        createAt: {
//            type: Date,
//            default: Date.now()
//        },
//        updateAt: {
//            type: Date,
//            default: Date.now()
//        }
//    }
//})
//UsersSchema.statics = {
//    fetch: function(cb) { //查询所有数据
//        return this
//            .find()
//            .sort('meta.updateAt') //排序
//            .exec(cb) //回调
//    },
//    findById: function(id, cb) { //根据id查询单条数据
//        return this
//            .findOne({_id: id})
//            .exec(cb)
//    }
//}
//var Users = mongoose.model('Users', UsersSchema)

//Users.fetch(function(err, users) {
//    if(err) {
//        console.log(err);
//    }
//    console.log(users);
//});
function createApp(){
    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    //app.set("view",path.join(__dirname,views));
    swig.setDefaults({
        varControls: ['{=', '=}']
        //cache: appConfig.isLocalMode() ? false : 'memory'
    });
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));
    //app.use('/html',express.static(path.join(__dirname,'views')));
    app.use('/files',express.static(path.join(__dirname,'files')));
    app.use(routerIndex);
    return app;
}

module.exports={
    createApp:createApp
}