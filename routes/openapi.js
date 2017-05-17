/**
 * Created by chem on 2017/5/17.
 */
/**
 * openapi 路由
 * @type {exports}
 */
var express = require('express');
var router = express.Router();
var fileupload = require('./openapi/fileupload');

router.use('/fileupload', fileupload);

module.exports = router;
