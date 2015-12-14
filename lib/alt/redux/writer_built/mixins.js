var router_1 = require("./router");
var LoginAction = require('./actions/login');
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
    MemoMix.selectTag = function (tag) {
        console.log(Mixin.dispatch);
        console.log(tag);
    };
    MemoMix.editMemo = function (memo) {
        console.log(memo);
    };
    return MemoMix;
})();
exports.MemoMix = MemoMix;
//# sourceMappingURL=mixins.js.map