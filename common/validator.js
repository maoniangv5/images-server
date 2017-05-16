let _ = require('underscore');

function validator(opt, validate = {
    notEmpty: [(value, expectValue) => {
        return value != undefined && value != null && !/^\s*$/g.test(value)
    }, "不能为空"],
    isEmail: [(v, ev) => {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(v)
    }, "邮箱格式不正确,应为XXX@XXX.XX"],
    isNumber: [(v, ev) => {
        return /^[0-9]+$/.test(v)
    }, "要求是数字"],
    length: [(v, ev) => {
        let max = ev.split('-')[1];
        let min = ev.split('-')[0];
        if (!min) {
            let reg = new RegExp("^\\S{" + 0 + "," + max + "}$");
            return reg.test(v)
        }
        let reg = new RegExp("^\\S{" + min + "," + max + "}$");
        return reg.test(v)
    }, "长度限制"],
    user: [(v) => /^[a-zA-z0-9\_]+$/.test(v), "用户名由字母,数字,下划线_组成"],
    password: [(v) => {
        return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(v)
    }, "别整骚密码,不认识"]
}) {
    let result = {}
    _.each(opt, (value, key) => {
        // 错误信息
        result[key] = [];
        // 实际值
        let actualValue = opt[key].value;
        // 遍历规则
        _.find(opt[key].rules, (v, i) => { // find跳出循环
            if (typeof v[0] == "function") {
                if (!v[0](actualValue)) {
                    result[key].push(v[1]);
                    return true
                }
            } else {
                if (!validate[i][0](actualValue, v[0])) {
                    result[key].push(v[1] || validate[i][1]);
                    return true
                }
            }
        })
        if (result[key].length == 0) {
            delete result[key]
        }
    })
    return result
}

let a = validator({
    name: {
        value: "2312312a3~~~21",
        rules: {
            notEmpty: [true],
            isNumber: [true],
            a: [function(v) {
                return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(v)
            }, "密码强度不够,由字母,数字,符号组成"]
        }
    }
})
console.log(a)

module.exports = validator;