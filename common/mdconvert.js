var marked = require('marked');
var _ = require('underscore');
var toc = require('marked-toc');

// 渲染器配置
var renderer = new marked.Renderer();
// renderer.heading = function(text, level) {
//     return '<h' + level + ' class="toc" ><a name="' + text + '">' + text + '</a></h' + level + '>';
// }
renderer.table = function(header, body) {
    return '<table class="table table-striped">' + header + body + '</table>'
}

// md 配置
var markedOptions = {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
};
var tocOpt = {
        template: "<%= depth %><%= bullet %>[<%= heading %>](#<%= heading %>)\n"
    }
    /**
     * md 词法解析为 html 字符串
     * @author yangjiaxun yangjiaxun@wondersgroup.com
     * @param {String} mdstr md 词法字符串
     * @param {Function} callback 回调函数
     * @param {Object} [option] marked 参数配置, 详情配置参考https://github.com/chjj/marked
     * @return {String} 当不添加回调函数时, 为同步解析
     */
module.exports = function(mdstr, callback, option) {
    if (option) _.extend(markedOptions, option);
    if (callback) {
        return marked(mdstr, markedOptions, callback);
    };
    // return marked(toc(mdstr, tocOpt), markedOptions) + marked(mdstr, markedOptions)
    return marked(mdstr, markedOptions)
}