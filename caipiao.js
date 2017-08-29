/**
 * Created by guminji on 2017/8/10.
 */
var redBallArray =[];
function sortRedBall(data,number,index,resultArray){
    for(var i = index;i<data.length;i++){
        var resultArrays = resultArray.concat();
        var judgeContinus =((data.length-i)>=(6-number));
        if(!judgeContinus)continue;
        resultArrays[number] = data[i];
        if(number==5){
            redBallArray.push(resultArrays);
        }
        else{
            sortRedBall(data,number+1,i+1,resultArrays);
        }
    }
}