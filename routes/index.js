/**
 * Created by guminji on 2017/2/24.
 */
var express = require("express");
var router = express.Router();
router.use('/RC',function(req,res){
    console.log(1);
    res.render('./layout')
})
module.exports = router;