/**
 * Created by guminji on 2017/8/24.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
function login(wherestr){
    //function (err, res2){
    //    if (err) {
    //        console.log("Error:" + err);
    //    }
    //    else {
    //        console.log('none');
    //        console.log('res2'+res2);
    //        if(!res2.length){
    //            console.log('none1');
    //            var user = new self.model({
    //                username : wherestr.username,                 //用户账号
    //                userpwd: wherestr.userpwd,                            //密码
    //                userage: 37,                                //年龄
    //                logindate : new Date()                      //最近登录时间
    //            });
    //
    //            user.save(function (err, res3) {
    //
    //                if (err) {
    //                    console.log("Error:" + err);
    //                }
    //                else {
    //                    //console.log('none2');
    //                    res.end(JSON.stringify({code:20000,Msg:'注册成功!!!'}))
    //                    //console.log("Res:" + res3);
    //                }
    //
    //            });
    //        }else{
    //            var rr = {code:50000,Msg:'用户名已经被注册!!!'};
    //            console.log(res2);
    //            var login = require('../auth/login.js');
    //
    //            login(res2._id,res);
    //            //res.end(JSON.stringify(rr));
    //            //res.end('111');
    //        }
    //        console.log("Res:" + res2);
    //    }
    //}
    //yield message = mgdb.queryDB(wherestr);
    //console.log(message);
    //var expires = moment().add('days', 7).valueOf();
    //var token = jwt.encode({
    //    iss: message._id,
    //    exp: expires
    //}, 'asdasdasdasd');
    //var end = JSON.stringify({
    //    token : token,
    //    expires: expires,
    //    //user: user.toJSON()
    //});
    //res.end(end);
    return function* (){
        var message = yield mgdb.queryDB(wherestr);
        if(!message) return ;
        var expires = moment().add('days', 7).valueOf();
        var token = jwt.encode({
            iss:message._id,
            exp: expires
        }, 'asdasdasdasd');
        var end = {
            token : token,
            expires: expires,
        };
        return end;
    }
}
module.exports = login;