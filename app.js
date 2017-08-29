/**
 * Created by guminji on 2017/2/24.
 */
var createApp = require("./createApp"),http = require("http");
var app = createApp.createApp();
let instance = require('./model/mongodb.js');
global.mgdb = new instance();//初始化数据连接 mongoDB常驻连接操作对象
//console.log(global.mgdb);
app.use(require('./routes/index'));
http.createServer(app).listen(3000);
