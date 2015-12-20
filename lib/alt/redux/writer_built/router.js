var router_1 = require('./lib/router');
var MemoAction = require('./actions/memo');
var LoginAction = require('./actions/login');
var Router = (function () {
    function Router() {
    }
    Router.initialize = function () {
        var _this = this;
        this.router.add('/w', function (params) {
            _this.dispatch(LoginAction.start());
        });
        this.router.add('/w/memos', function (params) {
            _this.dispatch(MemoAction.loadMemoIndex(params['tagIds'], params['pageNum']));
        });
        this.router.add('/w/memos/new', function (params) { return _this.dispatch(MemoAction.goEditNewMemo()); });
        this.router.add('/w/memos/:memoId', function (params) { return _this.dispatch(MemoAction.goEditMemoById(params['memoId'])); });
    };
    Router.go = function (url, isRecord) {
        if (isRecord === void 0) { isRecord = true; }
        if (isRecord) {
            history.pushState({}, null, url);
        }
        return this.router.execute(url);
    };
    Router.goHere = function (isRecord) {
        if (isRecord === void 0) { isRecord = true; }
        return this.go(Router.strippedPath(), isRecord);
    };
    Router.strippedPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/');
    };
    Router.router = new router_1.default();
    return Router;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map