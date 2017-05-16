/**
 * Created by chem on 2017/5/16.
 */
var Md5BO = require('./model/md5bo');

var Md5Service = {};

/**
 * 保存md5
 *
 * @param data
 * @param callback
 */
Md5Service.save = function (data, callback) {
    var Md5Bo = new Md5BO(data);
    Md5Bo.save(function (err, res) {
        if (err) {
            console.error(err);
            return callback(err)
        }
        callback(null, res);
    })
}

/**
 * 查找md5是否存在
 *
 * @param query
 * @param callback
 */
Md5Service.find = function(query,callback){
    if (!query){
        query = {};
    }

    Md5BO.count({md5:query.md5}, function(err,count){ // 查询mongodb实例数量
        if (err){
            callback(err);
            return console.error(err);
        }
        callback(null, count);
    })
};

module.exports = Md5Service;