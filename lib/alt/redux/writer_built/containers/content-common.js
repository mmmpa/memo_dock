var status_1 = require('../constants/status');
var mix_1 = require('../lib/mix');
var CommonContainer = (function () {
    function CommonContainer() {
    }
    CommonContainer.prototype.initializeCommonListener = function (register) {
        var _this = this;
        register('link:index', function () { return _this._rac_linkIndex(); });
        register('link:newMemo', function () { return _this._rac_linkNewMemo(); });
        register('logOut', function () { return _this._rac_logOut(); });
    };
    CommonContainer.prototype.checkLogin = function () {
        var _this = this;
        if (this._rac_isLoggedIn()) {
            return true;
        }
        this._rac_inquireLogin(null, function () {
            _this._rac_requireLogin();
        });
        return false;
    };
    CommonContainer.prototype._rac_linkIndex = function () {
        this.props.pushState(null, '/w/memos/');
    };
    CommonContainer.prototype._rac_linkNewMemo = function () {
        this.props.pushState(null, '/w/memos/new');
    };
    CommonContainer.prototype._rac_logOut = function () {
        var _this = this;
        this.props.loginAction.logOut(function () { return _this.props.pushState(null, '/w'); });
    };
    CommonContainer.prototype._rac_isLoggedIn = function () {
        var loginState = this.props.state.loginState;
        return loginState === status_1.LoginState.LoggedIn;
    };
    CommonContainer.prototype._rac_inquireLogin = function (succeed, fail) {
        this.props.memoAction.checkLogin(succeed, fail);
    };
    CommonContainer.prototype._rac_requireLogin = function () {
        this.props.pushState(null, '/w');
    };
    return CommonContainer;
})();
exports.CommonContainer = CommonContainer;
function mixCommon(target) {
    mix_1.default(target, [CommonContainer]);
}
exports.mixCommon = mixCommon;
//# sourceMappingURL=content-common.js.map