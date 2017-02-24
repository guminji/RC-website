/**
 * Created by guminji on 2017/2/24.
 */
var createApp = require("./createApp"),http = require("http");
var app = createApp.createApp();
http.createServer(app).listen(3000);
