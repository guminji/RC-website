/**
 * Created by guminji on 2017/8/24.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
function login(wherestr,tableName){
    return function* (){
        var message = yield mgdb.queryDB(wherestr,tableName);
        //console.log(message);
        if(!message.length) return ;
        var expires = moment().add('days', 7).valueOf();
        console.log(message[0]._id);
        var token = jwt.encode({
            iss:message[0]._id,
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