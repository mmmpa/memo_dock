var router_1 = require('./lib/router');
var MemoAction = require('./actions/memo');
var WriterRouter = (function () {
    function WriterRouter() {
    }
    WriterRouter.initialize = function () {
        var _this = this;
        // メモ一覧を取得
        this.router.add('/w/memos', function (params) { return _this.go('/w/tags/-/memos/1'); });
        // メモの内容を取得
        this.router.add('/w/memos/new', function (params) { return _this.dispatch(MemoAction.goEditNewMemo()); });
        this.router.add('/w/memos/:memoId', function (params) { return _this.dispatch(MemoAction.goEditMemoById(params['memoId'])); });
        this.router.add('/w/tags/:tagIds/memos/:pageNum', function (params) { return _this.dispatch(MemoAction.loadMemoIndex(params['pageNum'])); });
    };
    WriterRouter.go = function (url, recoarding) {
        if (recoarding === void 0) { recoarding = true; }
        if (recoarding) {
            history.pushState({}, null, url);
        }
        return this.router.execute(url);
    };
    WriterRouter.goHere = function (recoarding) {
        if (recoarding === void 0) { recoarding = true; }
        return this.go(WriterRouter.strippedPath(), recoarding);
    };
    WriterRouter.strippedPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/');
    };
    WriterRouter.router = new router_1.default();
    return WriterRouter;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WriterRouter;
//# sourceMappingURL=router.js.map