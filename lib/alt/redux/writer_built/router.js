var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_router_1 = require('./lib/app-router');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.apply(this, arguments);
    }
    Router.initialize = function () {
        var _this = this;
        this.router.add('/w', function (params) {
            _this.dispatcher.login.start();
        });
        this.router.add('/w/memos', function (params) {
            _this.dispatcher.memo.loadMemoIndex(params['tagIds'], params['pageNum']);
        });
        this.router.add('/w/memos/new', function (params) { return _this.dispatcher.memo.editNewMemo(); });
        this.router.add('/w/memos/:memoId', function (params) { return _this.dispatcher.memo.editMemoById(params['memoId']); });
    };
    return Router;
})(app_router_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map