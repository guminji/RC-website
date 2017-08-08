/**
 * Created by guminji on 2017/8/4.
 */
var mongose =require('./db.js');
Schema = mongose.Schema;

var UserSchema = new Schema({
    username : { type: String },                   //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date}                       //最近登录时间
});
module.exports = mongose.model('User',UserSchema);