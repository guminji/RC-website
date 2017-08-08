/**
 * Created by guminji on 2017/2/24.
 */
var createApp = require("./createApp"),http = require("http");
var app = createApp.createApp();
app.use(require('./routes/index'))
http.createServer(app).listen(3000);
