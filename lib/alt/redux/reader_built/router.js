var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_router_1 = require('./lib/app-router');
var MemoAction = require('./actions/memo');
var TagAction = require('./actions/tag');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.apply(this, arguments);
    }
    Router.initialize = function () {
        var _this = this;
        this.router.add('/memo/:memoId', function (params) {
            var tagIds = _this.split(params['tagIds']);
            _this.dispatch(MemoAction.show(+params['memoId']));
            _this.dispatch(MemoAction.index(tagIds));
            _this.dispatch(TagAction.index(tagIds));
        });
        this.router.add('/', function (params) {
            var tagIds = _this.split(params['tagIds']);
            _this.dispatch(MemoAction.remove());
            _this.dispatch(MemoAction.index(tagIds));
            _this.dispatch(TagAction.index(tagIds));
        });
        this.router.add('', function (params) {
            var tagIds = _this.split(params['tagIds']);
            _this.dispatch(MemoAction.remove());
            _this.dispatch(MemoAction.index());
            _this.dispatch(TagAction.index(tagIds));
        });
    };
    Router.split = function (ids) {
        if (!ids) {
            return [];
        }
        return ids.split(',').map(function (n) { return +n; });
    };
    return Router;
})(app_router_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map