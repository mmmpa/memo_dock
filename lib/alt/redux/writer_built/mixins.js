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
    MemoMix.renderSlim = function (slim) {
        Mixin.dispatch(MemoAction.renderSlim(slim));
    };
    MemoMix.goMemoIndex = function () {
        Mixin.dispatch(MemoAction.getIndex(1));
    };
    MemoMix.goNewMemo = function () {
        Mixin.dispatch(MemoAction.editNewMemo());
    };
    MemoMix.selectTag = function (tag) {
        console.log(Mixin.dispatch);
        console.log(tag);
    };
    MemoMix.editMemo = function (memo) {
        Mixin.dispatch(MemoAction.editMemo(memo));
    };
    MemoMix.pageIndex = function (page) {
        Mixin.dispatch(MemoAction.getIndex(page));
    };
    return MemoMix;
})();
exports.MemoMix = MemoMix;
//# sourceMappingURL=mixins.js.map