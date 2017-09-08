/**
 * Created by guminji on 2017/8/24.
 */
var createAllTables = require('./alltables');
//连接mongodb
module.exports = class mongdb{
    constructor(){
        this.mongose = null;
        this.init()
    }
    init(){
        this.connect();
    }
    //连接mongoDB
    connect(){
        var mongoose = require("mongoose");
        var db_url = 'mongodb://localhost:27017/local';//连接地址
        mongoose.connect(db_url);
        this.mongose = mongoose;
        /**
         * 连接成功
         */
        mongoose.connection.on('connected', function () {
            console.log('Mongoose connection open to 11' );
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
        let Schema = this.mongose.Schema;
        //let UserSchema = new Schema({
        //    username : { type: String },                   //用户账号
        //    userpwd: {type: String},                        //密码
        //    userage: {type: Number},                        //年龄
        //    logindate : { type: Date}                       //最近登录时间
        //});
        //let model =this.model= this.mongose.model('User',UserSchema);
        this.models =createAllTables(this.mongose);
        //let publishsSchema = this.publishsSchema= new Schema({
        //    content: {type: String},
        //});

        //this.models.Publishs= this.mongose.model('Publishs',publishsSchema);
    }
    queryDB(wherestr,tableName){
        var self = this;
        return new Promise(function(resolve,reject){
            var table  = self.models[tableName];
            table.find(wherestr,function(err,res){
                if(err){
                    reject(err);
                }
                else{
                    //console.log('res'+res);
                    resolve(res);
                }
            })
        })
    }
    saveDB(wherestr,tableName){
        var self = this;
        return new Promise(function(resolve,reject){
            //var table  = self.models[tableName];
            var table =self.models[tableName];
            console.log(wherestr);
            var things = new table(wherestr);
            things.save(function (err, res) {

                if (err) {
                    reject(err);
                    console.log("Error:" + err);
                }
                else {
                    //console.log('none2');
                    resolve(res);
                    //res.end(JSON.stringify({code:20000,Msg:'注册成功!!!'}))
                    //console.log("Res:" + res3);
                }

            });
        })
    }
}
