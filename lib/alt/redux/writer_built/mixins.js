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
        MemoMix.loadMemoIndex();
    };
    MemoMix.goNewMemo = function () {
        Mixin.dispatch(MemoAction.goEditNewMemo());
    };
    MemoMix.goMemoEditById = function (id) {
        Mixin.dispatch(MemoAction.goEditMemoById(id));
    };
    MemoMix.goMemoEdit = function (memo) {
        Mixin.dispatch(MemoAction.goEditMemoById(memo.id));
    };
    MemoMix.goTaggedIndex = function (tag) {
        console.log(Mixin.dispatch);
        console.log(tag);
    };
    MemoMix.saveMemo = function (memo) {
        Mixin.dispatch(MemoAction.saveMemo(memo));
    };
    MemoMix.loadMemoIndex = function (page) {
        if (page === void 0) { page = 1; }
        Mixin.dispatch(MemoAction.loadMemoIndex(page));
    };
    MemoMix.renderSlim = function (slim) {
        Mixin.dispatch(MemoAction.renderSlim(slim));
    };
    return MemoMix;
})();
exports.MemoMix = MemoMix;
//# sourceMappingURL=mixins.js.map