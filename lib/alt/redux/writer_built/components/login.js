var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var status_1 = require('../constants/status');
var fa_1 = require('../lib/components/fa');
var eventer_1 = require("../lib/components/eventer");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        _super.call(this, props);
        this.state = { email: '', password: '' };
    }
    Login.prototype.changePassword = function (e) {
        this.setState({ email: this.state.email, password: e.target.value });
    };
    Login.prototype.changeEmail = function (e) {
        this.setState({ email: e.target.value, password: this.state.password });
    };
    Login.prototype.detectMessage = function () {
        switch (this.props.loginState) {
            case status_1.LoginState.Invalid:
                return React.createElement("p", {"className": "login state"}, "'Invalid. Please retry.'");
            default:
                return null;
        }
    };
    Login.prototype.detectButton = function () {
        switch (this.props.loginState) {
            case status_1.LoginState.Wait:
                return React.createElement("button", {"type": "submit", "className": "login submit wait", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "Wait");
            default:
                return React.createElement("button", {"type": "submit", "className": "login submit ready", "onClick": this.login.bind(this)}, React.createElement(fa_1.default, {"icon": "smile-o"}), "Login");
        }
    };
    Login.prototype.login = function (e) {
        this.dispatch('login', this.state.email, this.state.password);
    };
    Login.prototype.render = function () {
        return React.createElement("div", null, React.createElement("article", {"className": "login container"}, React.createElement("header", {"className": "login title-area"}, React.createElement("h1", {"className": "login title"}, "Login")), React.createElement("section", {"className": "login input-area"}, React.createElement("h1", {"className": "login sub-title"}, "Email Address"), React.createElement("input", {"className": "login input email", "type": "text", "value": this.state.email, "name": "email", "onChange": this.changeEmail.bind(this)})), React.createElement("section", {"className": "login input-area"}, React.createElement("h1", {"className": "login sub-title"}, "Password"), React.createElement("input", {"className": "login input password", "type": "password", "value": this.state.password, "name": "password", "onChange": this.changePassword.bind(this)})), React.createElement("section", {"className": "login submit-area"}, this.detectButton()), this.detectMessage()));
    };
    return Login;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
eventer_1.mixChild(Login);
//# sourceMappingURL=login.js.map