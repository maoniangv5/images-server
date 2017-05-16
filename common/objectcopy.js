var _ = require('underscore');
/**
 * bo 转 vo 
 * @author yangjiaxun yangjiaxun@wondersgroup.com
 * @param {Object} bo entity
 * @param {Array} rules 字段数据
 * @return {vo} vo对象
 */
module.exports = function(bo, rules, isundefined) {
    isundefined = isundefined === undefined ? true : isundefined;
    var vo = {};
    // 校验bo, rules
    if (_.isArray(rules) && _.isObject(bo)) {
        var ruleLen = rules.length;
        try {
            for (var i = 0; i < ruleLen; i++) {
                var rule = rules[i].split(":");
                vo[rule[0]] = rule[1] ? bo[rule[1]] : bo[rule[0]];
                if (isundefined) {
                    if (!vo[rule[0]]) delete vo[rule[0]]
                }
            }
            return vo;
        } catch (err) {
            return bo
        }
    }
    return bo;
};