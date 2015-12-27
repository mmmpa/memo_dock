var _ = require('lodash');
function pickQueryString() {
    var result = location.href.match(/\?.+/);
    return result ? result[0] : '';
}
exports.pickQueryString = pickQueryString;
function pickPath() {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
}
exports.pickPath = pickPath;
function buildQueryString(hash) {
    var result = [];
    _.pairs(hash).map(function (kv) {
        if (kv[1]) {
            result.push(kv.join('='));
        }
    });
    if (!result.length) {
        return '';
    }
    return '?' + result.join('&');
}
exports.buildQueryString = buildQueryString;
//# sourceMappingURL=path-manip.js.map