var _ = require('lodash');
function buildQueryString(hash) {
    var result = [];
    _.pairs(hash).map(function (kv) {
        if (kv[1]) {
            result.push(kv.map(function (v) { return encodeURIComponent(v); }).join('='));
        }
    });
    if (!result.length) {
        return '';
    }
    return '?' + result.join('&');
}
exports.buildQueryString = buildQueryString;
//# sourceMappingURL=path-manip.js.map