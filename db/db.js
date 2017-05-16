/**
 * Created by chem on 2017/5/16.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongodb_url); // 简写

module.exports = mongoose;