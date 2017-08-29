/**
 * Created by guminji on 2017/8/9.
 */
/**
 * 数据交互模块
 */
(function(global){
    //定义io的命名空间
    var io = global.io = {};

    //data
    io.data = {
        _commKey : null,		//res加密公钥所用到的key
        token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyNzI0MTEwNjMiLCJleHAiOjE1MDU5NzM2MTd9.DFN-kaFYy4oJlij8vhB7S7IhAG91CyrW8b8UefNxbIY',			//玩家token，在连接初始化时用于res生成公钥
        jwtToken : null,		//res加密之后的玩家token，数据交互以此token为主
        publicKey : publicKey,		//res公钥
        connectionUrl : websocketurl,	//连接url
        encryptedString:null,
        //encryptedString : 'PhFXvo8+kREJvxDAH5KCw+66RAD+W+J6GbXiAC+grxNi1Qty3crW1a0ov2oTfWBVCpTfTcho1Q5dT/u7d0GiwKAP7f5eGwSkBbBsdkLfX/C77aHu8kPZlFFLoWlcrskw2bnQPuGY07cvKdYAB0OFkS9p3ht6fLdE3BJK6wi+wzP1POozwLUWLsiibErOmauGLQoa5mwXLJxX5EuBz1Mi/Tega6BH7aIFCMeHl5LVDnCTHrrw2CKhOVYc3BGixHrdq0WdZ1fTj1tFxcetd01wxZyJEGyUvLlx4oxrOEKk/z7WWBM+a3KJoP7Mju4dtsqPI/BWnNcLZBs1Zo79XVdK4A==',	//res加密后的验证字符串
        isOpened : false		//连接是否已经初始化过
    };

    io.cmd = {
        CONN_INIT : "conn::init",			//连接初始化，用来更新jwt token
        CONN_ERROR : "conn::error",			//服务端异常

        TEST_PING : "test::ping",			//测试用命令
        TEST_PONG : "test::pong",			//测试用命令
        activity  : 'activity', 		// 不中险
        alarm     : "losePointRemind", //输分提醒
        marguee   : 'marguee'
    };

    var primus = null;
    var registedAction = {};

    //生成commkey
    io.generateCommKey = function(){
        try{
        //默认32位编码
            io.data._commKey = Date.parse(new Date()).toString() + Date.parse(new Date()).toString() + Date.parse(new Date()).toString().substring(0,6);
        }
        catch(e){
            console.log("初始化commKey失败",e);
        }

        return this;
    }

    //生成encryptedString
    io.generateEncryptedString = function(){
        try{
            var params = "jwt=" + io.data.token + "&commKey=" + io.data._commKey;
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(io.data.publicKey);
            io.data.encryptedString = jsencrypt.encrypt(params);
        }
        catch(e){
            console.log("初始化encryptedString失败",e);
        }

        return this;
    }

    io.connect = function(){
        try{
            primus = Primus.connect(io.data.connectionUrl);

            primus.on('outgoing::url', function(url){
                url.query = 'login=' + io.data.encryptedString;
                console.log("outgoing::url",url.query);
            });

            primus.on('open', function(){
                //防止reconnect之后重复触发open，以下事件只绑定一次
                if(io.data.isOpened){ return; }

                io.data.isOpened = true;
                //console.log("连接成功");
                alert("连接成功");
                //webgm.scene.hall = new Hall();
                //GM.commonUtils.roomReturn();
                //webgm.scene.loading.visible = false;
                primus.on('data', function(data){
                    io.onData(data);
                });

                primus.on('error', function(data){
                    Laya.stage.event('showUnConnect',['UnConnect',new unconnect('服务器连接出错，请刷新！')]);
                    io.end();
                    // console.log("连接出错");
                    // io.dispatchEvent("onError",data);
                });

                primus.on('reconnect', function(){
                    // console.log("重连中");
                    // io.dispatchEvent("onReconnect");

                    io.end();
                    Laya.stage.event('showUnConnect',['UnConnect',new unconnect('连接中断，请刷新！')]);
                });

                primus.on('end', function(){
                    io.end();
                    Laya.stage.event('showUnConnect',['UnConnect',new unconnect('连接中断，请刷新！')]);
                    console.log("连接已关闭");
                    //io.dispatchEvent("onEnd");
                });

                //触发open
                io.dispatchEvent("onOpen");
            });
        }
        catch(e){
            console.log(e);
            alert(e);
        }

        return this;
    }

    io.onData = function(data){
        //解密
        var decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(io.data._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var dataString = decryptstr.toString(CryptoJS.enc.Utf8);
        var parsedData = JSON.parse(dataString);
        console.log("接收到数据：",parsedData.cmd,parsedData);

        //更新jwt token
        if(parsedData.cmd == io.cmd.CONN_INIT){
            io.data.jwtToken = parsedData.res;
        }
        else{
            //检测是否有已注册事件回调
            var action = registedAction[parsedData.cmd];

            if(action && typeof action == "function"){
                action(parsedData.res);
            }
        }
        switch(parsedData.cmd){
            case io.cmd.activity : //不中险
                if(webgm.scene.room&&webgm.scene.room.visible){
                    if (window.GM && GM.socket_RJ && GM.socket_RJ.pop) {
                        GM.socket_RJ.pop('buzhongxian', parsedData.res.buzhongxian.prizePoint);
                        var money = parsedData.res.buzhongxian.prizePoint;
                        if(money>0){
                            Laya.stage.event('addMoney',money);
                        }
                    }
                }
                break;
            case io.cmd.alarm : //输分提醒
                if (window.GM && GM.loseRemind && GM.loseRemind.pop) {
                    GM.loseRemind.pop(parsedData.res.level, parsedData.res.endTime);
                    if(webgm.scene.room&&webgm.scene.room.visible){
                        webgm.scene.room.stopGame();
                    }
                }
                break;
            case io.cmd.marguee:
                if(webgm.scene.room&&webgm.scene.room.visible){
                    if(window.notifyTest){
                        var newArray = GM.commonUtils.handleMargueeArray(parsedData.res);
                        window.notifyTest.add(newArray);
                    }
                }

                break;
            default:
                break;
        }
        return this;
    }

    io.emit = function(data){
        //为data增加token
        if(data.params){
            data.params.jwt = io.data.jwtToken;
        }
        else{
            data.params = { jwt : io.data.jwtToken };
        }

        data.status = { time : new Date().getTime() };

        console.log("发送数据：",JSON.stringify(data));

        //加密
        var encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(io.data._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        //发送加密数据
        primus.write(encryptData.toString());

        return this;
    }

    //手动断开连接
    io.end = function(){
        primus && primus.end();

        return this;
    }

    //初始化
    io.init = function(options){
        $.extend(io.data,options);

        io.generateCommKey();
        io.generateEncryptedString();

        return this;
    }

    //注册事件回调
    io.registerAction = function(act){
        $.extend(registedAction,act);

        return this;
    }

    //分发事件
    io.dispatchEvent = function(eventName,data){
        var cb = registedAction[eventName];
        if(typeof cb == "function"){
            cb(data);
        }
        return this;
    }

    //推送数据
    io.post = function(cmd,params,callback){
        registedAction[cmd] = callback;
        io.emit({cmd:cmd,params:params});

        return this;
    }

})(this);
