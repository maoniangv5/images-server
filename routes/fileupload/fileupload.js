/**
 * 文件上传 API路由请求
 * @type {*|exports|module.exports}
 */
var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var app = express();
var fs = require('fs');
var RestMsg = require('../../common/restmsg');
var multer = require('multer');
var md5 = require('md5');
var Md5Service = require('../../service/md5/md5service')


//初始化multer
var mwMulter1 = multer({
    dest: config.md_config.mdimgs
});

router.post('/img', mwMulter1, function (req, res, next) { // 上传图片API
    if (!fs.existsSync(config.md_config.mdimgs)) {
        fs.mkdirSync(config.md_config.mdimgs);
    }
    var rm = new RestMsg();
    var files = req.files;
    var query = {};
    if (files.file) {
        fs.readFile(files.file.path, function(err, buf) {
            var ext = files.file.extension
            query.md5 = md5(buf);
            query.old_path = files.file.path;
            query.new_path = config.md_config.mdimgs + '/' + md5(buf) + '.' + ext;
            Md5Service.find(query, function (err, count) {
                if (err) {
                    rm.errorMsg(err);
                    return res.send(rm)
                }
                if (count == 0){
                    fs.rename(query.old_path, query.new_path, function(err){
                        if(err){
                            throw err;
                        }
                    })
                    Md5Service.save(query, function (err, ret) {
                        if (err) {
                            rm.errorMsg(err);
                            return res.send(rm)
                        }
                        var obj = {}
                        obj.originalname = files.file.originalname;
                        obj.path = query.new_path;
                        obj.url = config.md_config.image_url + '/' + md5(buf) + '.' + ext;
                        rm.successMsg();
                        rm.setResult(obj);
                        res.send(rm);
                    })
                } else {
                    fs.unlink(query.old_path, function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                    var obj = {}
                    obj.originalname = files.file.originalname;
                    obj.path = query.new_path;
                    obj.url = config.md_config.image_url + '/' + md5(buf) + '.' + ext;
                    rm.successMsg();
                    rm.setResult(obj);
                    res.send(rm);
                }
            })
        });
    }
});

module.exports = router;