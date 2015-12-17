var router_1 = require('./lib/router');
var mixins_1 = require("./mixins");
var WriterRouter = (function () {
    function WriterRouter() {
    }
    WriterRouter.initialize = function () {
        // メモ一覧を取得
        this.router.add('/w/memos', function (params) { return mixins_1.MemoMix.loadMemoIndex(); });
        // メモの内容を取得
        this.router.add('/w/memos/:memoId', function (params) { return mixins_1.MemoMix.goMemoEditById(params['memoId']); });
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