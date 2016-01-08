var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var redux_router_1 = require('redux-router');
var LoginAction = require("../actions/login");
var status_1 = require('../constants/status');
var login_1 = require("../components/login");
var eventer_1 = require("../lib/components/eventer");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        this.initializeAsEventing();
        _super.call(this, props);
    }
    Login.prototype.listen = function (to) {
        var _this = this;
        to('login', function (email, password) {
            _this.props.loginAction.login(email, password);
        });
    };
    Login.prototype.componentWillMount = function () {
        this.props.loginAction.checkInitialState();
        this.checkLogin(this.props);
    };
    Login.prototype.componentWillReceiveProps = function (nextProps) {
        this.checkLogin(nextProps);
    };
    Login.prototype.checkLogin = function (props) {
        var loginState = props.state.loginState;
        var pushState = props.pushState;
        if (loginState === status_1.LoginState.LoggedIn) {
            pushState(null, '/w/memos/');
        }
    };
    Login.prototype.render = function () {
        var loginState = this.props.state.loginState;
        var login = this.login;
        return React.createElement(login_1.default, React.__spread({}, { login: login, loginState: loginState }));
    };
    return Login;
})(React.Component);
eventer_1.mixParent(Login);
function mapDispatchToProps(dispatch) {
    return {
        loginAction: Redux.bindActionCreators(LoginAction, dispatch),
        pushState: Redux.bindActionCreators(redux_router_1.pushState, dispatch)
    };
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=login.js.map