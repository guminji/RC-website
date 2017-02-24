/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express"),path = require('path');
var routerIndex =require('./routes/index')
function createApp(){
    var app = express();
    //app.set("view",path.join(__dirname,views));
    app.set('views', path.join(__dirname, 'views'));
    app.use('/html',express.static(path.join(__dirname,'views')))
    app.use(routerIndex);
    return app;
}

module.exports={
    createApp:createApp
}