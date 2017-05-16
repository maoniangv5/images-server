/**
 * 文件上传 API路由请求
 * @type {*|exports|module.exports}
 */
var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var fs = require('fs');
var RestMsg = require('../../common/restmsg');
var multer = require('multer');
var md5 = require('md5');
var Md5Service = require('../../service/md5/md5service')
var SHA1 = require('./../../common/sha1')

var imgs_dir = config.imgs.imgs_dir;
var imgs_url = config.imgs.imgs_url;

//初始化multer
var mwMulter1 = multer({
    dest: imgs_dir
});

router.post('/img', mwMulter1, function (req, res, next) { // 上传图片API
    if (!fs.existsSync(imgs_dir)) {
        fs.mkdirSync(imgs_dir);
    }
    var rm = new RestMsg();
    var files = req.files;
    var query = {};
    if (files.file) {

        // 七牛的sha1算法，计算图片sha1值
        SHA1(files.file.path, function (cb) {
            // console.log(cb) // sha1值，未使用
        })
        fs.readFile(files.file.path, function(err, buf) {
            var ext = files.file.extension
            query.md5 = md5(buf); // 调用md5包，计算图片md5值
            query.old_path = files.file.path;
            query.new_path = imgs_dir + '/' + md5(buf) + '.' + ext;

            /** 根据md5值，查询md5表中是否已有上传过的相同
             * 若没有，则保存临时文件后以md5值重命名，返回新文件的访问地址
             * 若有，则删除未上传文件，返回已有md5访问地址
             */
            Md5Service.find(query, function (err, count) {
                if (err) {
                    rm.errorMsg(err);
                    return res.send(rm)
                }
                if (count == 0){

                    // 用计算出的md5值，重新命名文件
                    fs.rename(query.old_path, query.new_path, function(err){
                        if(err){
                            throw err;
                        }
                    })

                    // 保存新文件的md5信息到md5表内
                    Md5Service.save(query, function (err, ret) {
                        if (err) {
                            rm.errorMsg(err);
                            return res.send(rm)
                        }
                        var obj = {}
                        obj.originalname = files.file.originalname;
                        obj.name = md5(buf) + '.' + ext;
                        obj.path = query.new_path;
                        obj.url = imgs_url + '/' + md5(buf) + '.' + ext;
                        rm.successMsg();
                        rm.setResult(obj);
                        res.send(rm);
                    })
                } else {

                    // 若已存在该图片则删除新图片，并返回相同md5文件的访问url
                    fs.unlink(query.old_path, function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                    var obj = {}
                    obj.originalname = files.file.originalname;
                    obj.name = obj.name = md5(buf) + '.' + ext;
                    obj.path = query.new_path;
                    obj.url = imgs_url + '/' + md5(buf) + '.' + ext;
                    rm.successMsg();
                    rm.setResult(obj);
                    res.send(rm);
                }
            })
        });
    }
});

module.exports = router;