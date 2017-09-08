/**
 * Created by guminji on 2017/8/30.
 * 所有的表关系
 */
module.exports = function(mongose){
    var allModels ={};
    let Schema = mongose.Schema;
    let UserSchema = new Schema({
        username : { type: String },                   //用户账号
        userpwd: {type: String},                        //密码
        userage: {type: Number},                        //年龄
        logindate : { type: Date}                       //最近登录时间
    });
    allModels.users= mongose.model('User',UserSchema);
    let publishsSchema = new Schema({
        title:{type: String},
        content: {type: String},
        photos:{type:Array}
    });

    allModels.publishs= mongose.model('Publishs',publishsSchema);
    return allModels;
}