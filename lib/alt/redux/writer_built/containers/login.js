var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var status_1 = require('../constants/status');
var login_1 = require("../components/login");
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
var redux_router_1 = require('redux-router');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.componentDidMount = function () {
        this.props.loginAction.checkInitialState();
    };
    App.prototype.login = function (email, password) {
        this.props.loginAction.login(email, password);
    };
    App.prototype.render = function () {
        console.log(this.props);
        var loginState = this.props.state.loginState;
        var pushState = this.props.pushState;
        if (loginState === status_1.LoginState.LoggedIn) {
            pushState(null, '/w/memos/');
            return React.createElement("div", null, "logged in...");
        }
        return React.createElement(login_1.default, {"login": this.login.bind(this), "loginState": loginState});
    };
    return App;
})(React.Component);
function mapDispatchToProps(dispatch) {
    return {
        memoAction: Redux.bindActionCreators(MemoAction, dispatch),
        loginAction: Redux.bindActionCreators(LoginAction, dispatch),
        pushState: Redux.bindActionCreators(redux_router_1.pushState, dispatch)
    };
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=login.js.map