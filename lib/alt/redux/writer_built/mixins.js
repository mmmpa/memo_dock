var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var LoginAction = require('./actions/login');
var MemoAction = require('./actions/memo');
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
var LoginWork = (function (_super) {
    __extends(LoginWork, _super);
    function LoginWork() {
        _super.apply(this, arguments);
    }
    LoginWork.login = function (email, password, afterLoginUri) {
        var _this = this;
        this.dispatch(LoginAction.tryLogin(email, password, function () {
            if (afterLoginUri) {
                _this.Router().go(afterLoginUri);
            }
            else {
                _this.Router().goHere();
            }
        }));
    };
    LoginWork.checkInitialState = function (callback) {
        this.dispatch(LoginAction.checkInitialState(function () { return callback(); }));
    };
    LoginWork.logout = function () {
        this.dispatch(LoginAction.logout());
    };
    return LoginWork;
})(WorkBase);
exports.LoginWork = LoginWork;
var MemoWork = (function (_super) {
    __extends(MemoWork, _super);
    function MemoWork() {
        _super.apply(this, arguments);
    }
    MemoWork.goNewMemo = function () {
        this.go('/w/memos/new');
    };
    MemoWork.goMemoEditById = function (id) {
        this.go('/w/memos/' + id);
    };
    MemoWork.loadMemoIndex = function (pageNum, tagIds) {
        if (pageNum === void 0) { pageNum = null; }
        if (tagIds === void 0) { tagIds = null; }
        this.go('/w/memos' + this.buildQueryString({ pageNum: pageNum, tagIds: tagIds }));
    };
    MemoWork.goTaggedIndex = function (tag) {
        this.loadMemoIndex(null, tag.id.toString());
    };
    MemoWork.goMemoIndex = function () {
        this.loadMemoIndex();
    };
    MemoWork.goMemoEdit = function (memo) {
        this.goMemoEditById(memo.id);
    };
    MemoWork.saveMemo = function (memo) {
        this.dispatch(MemoAction.saveMemo(memo));
    };
    MemoWork.deleteMemo = function (memo) {
        var _this = this;
        this.dispatch(MemoAction.deleteMemo(memo, function () { return _this.Router().goHere(); }));
    };
    return MemoWork;
})(WorkBase);
exports.MemoWork = MemoWork;
//# sourceMappingURL=mixins.js.map