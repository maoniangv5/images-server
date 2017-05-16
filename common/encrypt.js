/**
 * 加密工具
 * Created by duanying on 2015/8/13.
 */

var crypto = require('crypto');
var key = "db-extract@0123x100$#365#$"; // 加密的密钥
var rsa = require('node-rsa');

/**
 * RSA私钥
 * @type {*|exports|module.exports}
 */
var key = new rsa('-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICXQIBAAKBgQCUJTrYpMY005GcFXHBZxMB+XP4ESJ5i+4r1QQ+sSPZnlT6FKyj\n' +
    'ostifzhVxUeBBx1B9VPJgYsYNRZs0VFDEPxqrMYO0oUyk88OBkPLbhYWVchVHcq/\n' +
    '7ngsAVeK8zV7TS+C9eV338khUocTlO9YUZJBjqGuudG4V9/3zIO7nG8K3QIDAQAB\n' +
    'AoGADVm1jeR7gDM4wgoksDsruVfTnZ1dr/puQkD2Gvg3tNrR6Z+HV0/KaFvypbgb\n' +
    'k4MindkP7e7grBPMq43JdvPG62sA5sIyWVgXyySwA7Ct6u8vmB85NY9sXRF6Ooke\n' +
    'Do1umDM7VCL7HDq6cigcwVDSaDFxLTQnWy0OLfsO0+4SrrkCQQDDEimq6vkZQDLS\n' +
    'qL3qyApETwHan1OYe8dEZk1nMYoKoKqnGu5pya/Pik9kbfc02nOgYWRFAGRNWvOc\n' +
    'XFRFoFeTAkEAwmrpRK7KUjJ56bG/5NmM7kEXq30Nd8yEu+65zeARAuBwBoLIpUb/\n' +
    'hPO2S21KrWsJ104iLH4iLPbMIbpjvuW5zwJBALN6IJA7RRkwchJUYviDOL8EmkYV\n' +
    '1Yo0SHDsV0cc009X5+t74eO/R10Cem2Cp7IfU8c6FFFQPPjXN9CjOn4dOrUCQG16\n' +
    'FnD+nB89HTljRlNvzdQ8A0Al4veaywOooig0DGA6UdrYunOXTztmoThICs0sgRYk\n' +
    'gUncnRIEx14WvyQ36DECQQC1wHmfkTL1izDnTAEvsiAgk502JnyChOfbFV9lknEV\n' +
    'vSW1bywwpaAGyM3l3xFFfe7faQfOX28gxkZbNAEDikym\n' +
    '-----END RSA PRIVATE KEY-----');

/**
 * RSA解密
 * @param str
 * @returns {Buffer|Object|string}
 */
crypto.rsade = function(str){
    return key.decrypt(str,'utf8');
}
/**
 * sha1算法加密
 * @param {str|需要加密的字符串}
 * @param {addSalt|密钥，默认为"db-extract@0123x100$#365#$"}
 */
crypto.sha1Hash = function (str, addSalt) {
    var salt = (addSalt) ? new Date().getTime() : "";
    return crypto.createHmac('sha1', salt + "").update(str + "").digest('hex');
}

/**
 * md5算法加密
 * @param {str|需要加密的字符串}
 */
crypto.md5Hash = function (str) {
    return crypto.createHash('md5').update(str + "").digest('hex');
}

/**
 * des-ede算法加密
 * @param {str|需要加密的字符串}
 */
crypto.encode = function (str) {
    var cipher = crypto.createCipher('des-ede', key);
    var crypted = cipher.update(str, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
}

/**
 * des-ede算法解密
 * @param {str|需要解密的字符串}
 */
crypto.dencode = function (str) {
    var decipher = crypto.createDecipher('des-ede', key);
    var dec = decipher.update(str, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports = crypto;
