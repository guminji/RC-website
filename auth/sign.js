/**
 * Created by guminji on 2017/9/1.
 */
module.exports = function(queryTerms){
    var queryTerms =queryTerms;
    return function* (){
        var checkrepeat = yield mgdb.queryDB({username:queryTerms.username},'users');
        if(!!checkrepeat.length){
            return {
                code:30000,
                msg:'账号已经被注册!'
            }
        }
        else{
            var newUser = yield mgdb.saveDB({
                username:queryTerms.username,
                userpwd:queryTerms.userpwd
            },'users')
            if(!!newUser){
                return {
                    code:20000,
                    msg:'注册成功'
                }
            }

        }

    }
}