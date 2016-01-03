var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var status_1 = require('../constants/status');
var mix_1 = require('../lib/mix');
var ContentCommon = (function (_super) {
    __extends(ContentCommon, _super);
    function ContentCommon(props) {
        _super.call(this, props);
        this.logOut = this.logOut.bind(this);
        this.createIndexLink = this.createIndexLink.bind(this);
        this.createNewMemoLink = this.createNewMemoLink.bind(this);
    }
    ContentCommon.prototype.componentWillMount = function () {
        var loginState = this.props.state.loginState;
        var _a = this.props, memoAction = _a.memoAction, pushState = _a.pushState;
        if (loginState !== status_1.LoginState.LoggedIn) {
            memoAction.checkLogin(null, function () {
                pushState(null, '/w');
            });
            return;
        }
    };
    ContentCommon.prototype.requireLogin = function () {
        this.props.pushState(null, '/w');
    };
    ContentCommon.prototype.logOut = function () {
        var _this = this;
        this.props.loginAction.logOut(function () { return _this.props.pushState(null, '/w'); });
    };
    ContentCommon.prototype.createIndexLink = function (children) {
        return React.createElement(react_router_1.Link, {"to": "/w/memos/"}, children);
    };
    ContentCommon.prototype.createNewMemoLink = function (children) {
        return React.createElement(react_router_1.Link, {"to": "/w/memos/new"}, children);
    };
    return ContentCommon;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentCommon;
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