/**
 * Created by guminji on 2017/8/24.
 */
var jwt =require('jwt-simple');
var resMgs = require('../config/resCode.json');
function auth(token){
    var result = {};
    try {
        //console.log(token);
        var decoded = jwt.decode(token, 'asdasdasdasd');
        //console.log(decoded)
        // handle token here
        result = decoded.exp <= Date.now()?{
            code:'50002',
            msg:resMsg['50002']
        }:{
            code:20000
        }
    } catch (err) {
        result ={
            code:'50001'
        }
    }
    return result;
}
module.exports = auth;