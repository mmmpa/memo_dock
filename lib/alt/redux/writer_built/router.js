var router_1 = require('./lib/router');
var MemoAction = require('./actions/memo');
var WriterRouter = (function () {
    function WriterRouter(dispatch) {
        this.router = new router_1.default();
        // メモ一覧を取得
        this.router.add('/w/memos', function (params) { return dispatch(MemoAction.getIndex()); });
        // メモの内容を取得
        this.router.add('/w/memos/:memo_id', function (params) { return console.log('メモの内容を取得'); });
    }
    WriterRouter.prototype.go = function (url) {
        return this.router.execute(url);
    };
    WriterRouter.prototype.goHere = function () {
        return this.go(WriterRouter.strippedPath());
    };
    WriterRouter.strippedPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/');
    };
    return WriterRouter;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WriterRouter;
//# sourceMappingURL=router.js.map