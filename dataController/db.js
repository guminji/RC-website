/**
 * Created by guminji on 2017/8/4.
 */
var mongoose = require("mongoose");
var db_url = 'mongodb://localhost:27017/local';
mongoose.connect(db_url);
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' );
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
