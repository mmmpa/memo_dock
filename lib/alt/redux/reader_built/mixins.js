var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var TagAction = require('./actions/tag');
var MemoAction = require('./actions/memo');
var memo_data_1 = require("./models/memo-data");
var WorkBase = (function () {
    function WorkBase() {
    }
    WorkBase.dispatch = function (action) {
        WorkBase.dispatchAction(action);
    };
    WorkBase.go = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        (_a = WorkBase.RouterClass).go.apply(_a, args);
        var _a;
    };
    WorkBase.Router = function () {
        return WorkBase.RouterClass;
    };
    WorkBase.pickPath = function () {
        return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
    };
    WorkBase.pickQueryString = function () {
        var result = location.href.match(/\?.+/);
        return result ? result[0] : '';
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
    TagWork.index = function (tagIdNumbers) {
        var tagIds = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
        this.go(this.pickPath() + this.buildQueryString({ tagIds: tagIds }), true, false);
        this.dispatch(TagAction.index(tagIdNumbers));
        this.dispatch(MemoAction.index(tagIdNumbers));
    };
    return TagWork;
})(WorkBase);
exports.TagWork = TagWork;
var MemoWork = (function (_super) {
    __extends(MemoWork, _super);
    function MemoWork() {
        _super.apply(this, arguments);
    }
    MemoWork.setTitle = function (title) {
        document.title = title;
    };
    MemoWork.getPortal = function () {
        var memo = new memo_data_1.default();
        try {
            var title = this.nojs.getElementsByTagName('h1')[0].innerHTML;
            var html = this.nojs.getElementsByTagName('section')[0].innerHTML;
            memo.title = title;
            memo.html = html;
        }
        catch (e) {
        }
        return memo;
    };
    MemoWork.show = function (memoId) {
        this.go('/memo/' + memoId + this.pickQueryString(), true, false);
        this.dispatch(MemoAction.show(memoId));
    };
    MemoWork.index = function (tagIdNumbers) {
        TagWork.index(tagIdNumbers);
    };
    return MemoWork;
})(WorkBase);
exports.MemoWork = MemoWork;
//# sourceMappingURL=mixins.js.map