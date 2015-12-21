var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var TagAction = require('./actions/tag');
var WorkBase = (function () {
    function WorkBase() {
    }
    WorkBase.dispatch = function (action) {
        WorkBase.dispatchAction(action);
    };
    WorkBase.go = function (uri) {
        WorkBase.RouterClass.go(uri);
    };
    WorkBase.Router = function () {
        return WorkBase.RouterClass;
    };
    WorkBase.buildQueryString = function (hash) {
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
    return WorkBase;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkBase;
var TagWork = (function (_super) {
    __extends(TagWork, _super);
    function TagWork() {
        _super.apply(this, arguments);
    }
    TagWork.logout = function () {
        this.dispatch(TagAction.index());
    };
    return TagWork;
})(WorkBase);
exports.TagWork = TagWork;
var MemoWork = (function (_super) {
    __extends(MemoWork, _super);
    function MemoWork() {
        _super.apply(this, arguments);
    }
    MemoWork.show = function (memoId) {
    };
    MemoWork.index = function (tagIds) {
    };
    return MemoWork;
})(WorkBase);
exports.MemoWork = MemoWork;
//# sourceMappingURL=mixins.js.map