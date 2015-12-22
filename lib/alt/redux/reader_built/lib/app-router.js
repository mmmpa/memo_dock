var router_1 = require('./router');
var AppRouter = (function () {
    function AppRouter() {
    }
    AppRouter.go = function (url, doRecord, doEexecute) {
        if (doRecord === void 0) { doRecord = true; }
        if (doEexecute === void 0) { doEexecute = true; }
        if (doRecord) {
            history.pushState({}, null, url);
        }
        if (doEexecute) {
            return this.router.execute(url);
        }
    };
    AppRouter.goHere = function (isRecord) {
        if (isRecord === void 0) { isRecord = true; }
        return this.go(this.strippedPath(), isRecord);
    };
    AppRouter.strippedPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/');
    };
    AppRouter.router = new router_1.default();
    return AppRouter;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRouter;
//# sourceMappingURL=app-router.js.map