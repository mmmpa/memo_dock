var router_1 = require('./router');
var _ = require('lodash');
var AppRouter = (function () {
    function AppRouter() {
    }
    AppRouter.go = function (url, doRecord, doExecute) {
        if (doRecord === void 0) { doRecord = true; }
        if (doExecute === void 0) { doExecute = true; }
        document.getElementById('canonical').setAttribute('href', this.rootPath() + url.replace(/\?.*/, ''));
        if (doRecord) {
            history.pushState({}, null, url);
        }
        if (doExecute) {
            return this.router.execute(url);
        }
    };
    AppRouter.goHere = function (isRecord) {
        if (isRecord === void 0) { isRecord = true; }
        return this.go(this.strippedPath(), isRecord);
    };
    AppRouter.rootPath = function () {
        return location.href.match(/.+?:\/\/(.+?)\//)[0].replace(/\/$/, '');
    };
    AppRouter.strippedPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/');
    };
    AppRouter.pickQueryString = function () {
        var result = location.href.match(/\?.+/);
        return result ? result[0] : '';
    };
    AppRouter.pickPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
    };
    AppRouter.buildQueryString = function (hash) {
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
    };
    AppRouter.router = new router_1.default();
    return AppRouter;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRouter;
//# sourceMappingURL=app-router.js.map