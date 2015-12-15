var router_1 = require('./lib/router');
var MemoAction = require('./actions/memo');
var WriterRouter = (function () {
    function WriterRouter() {
    }
    WriterRouter.initialize = function () {
        var _this = this;
        // メモ一覧を取得
        this.router.add('/w/memos', function (params) { return _this.dispatch(MemoAction.getIndex()); });
        // メモの内容を取得
        this.router.add('/w/memos/:memoId', function (params) { return _this.dispatch(MemoAction.editMemoById(params['memoId'])); });
    };
    WriterRouter.go = function (url) {
        return this.router.execute(url);
    };
    WriterRouter.goHere = function () {
        return this.go(WriterRouter.strippedPath());
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