/**
 * Created by chem on 2017/5/16.
 */
var mongoose = require('../../../db/db');

// 定义标签集合的结构
var Md5Schema = mongoose.Schema({
    "md5": String //标签名称
},{
    versionKey:false,
});

var md5 = mongoose.model('md5', Md5Schema , 'md5'); // 将定义好的结构封装成model

module.exports = md5; // 导出labelbo模块