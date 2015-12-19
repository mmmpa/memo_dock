var router_1 = require("./router");
var LoginAction = require('./actions/login');
var MemoAction = require('./actions/memo');
var Mixin = (function () {
    function Mixin() {
    }
    return Mixin;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mixin;
var LoginMix = (function () {
    function LoginMix() {
    }
    LoginMix.login = function (email, password) {
        Mixin.dispatch(LoginAction.tryLogin(email, password, function () { return router_1.default.goHere(); }));
    };
    return LoginMix;
})();
exports.LoginMix = LoginMix;
var MemoMix = (function () {
    function MemoMix() {
    }
    MemoMix.goMemoIndex = function () {
        this.loadMemoIndex();
    };
    MemoMix.goNewMemo = function () {
        router_1.default.go('/w/memos/new');
    };
    MemoMix.goMemoEditById = function (id) {
        router_1.default.go('/w/memos/' + id);
    };
    MemoMix.goMemoEdit = function (memo) {
        this.goMemoEditById(memo.id);
    };
    MemoMix.loadMemoIndex = function (page, tagIds) {
        if (page === void 0) { page = 1; }
        if (tagIds === void 0) { tagIds = '-'; }
        router_1.default.go('/w/tags/' + tagIds + '/memos/' + page);
    };
    MemoMix.goTaggedIndex = function (tag) {
        router_1.default.go('/w/tags/' + tag.id + '/memos/1');
    };
    MemoMix.saveMemo = function (memo) {
        Mixin.dispatch(MemoAction.saveMemo(memo));
    };
    MemoMix.renderSlim = function (slim) {
        Mixin.dispatch(MemoAction.renderSlim(slim));
    };
    return MemoMix;
})();
exports.MemoMix = MemoMix;
//# sourceMappingURL=mixins.js.map