var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var Mui = require('material-ui');
var Status = require('../constants/status');
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        _super.call(this, props);
        this.state = { email: '', password: '' };
    }
    Login.prototype.changePassword = function (e) {
        this.setState({ password: e.target.value });
    };
    Login.prototype.changeEmail = function (e) {
        this.setState({ email: e.target.value });
    };
    Login.prototype.detectMessage = function () {
        switch (this.props.loginState) {
            case Status.Login.Invalid:
                return 'Invalid. Please retry.';
            default:
                return '';
        }
    };
    Login.prototype.detectButton = function () {
        switch (this.props.loginState) {
            case Status.Login.Wait:
                return React.createElement(Mui.RaisedButton, {"className": "login submit", "label": "Wait", "disabled": true});
            default:
                return React.createElement(Mui.RaisedButton, {"className": "login submit", "label": "Login", "primary": true, "onClick": this.login.bind(this)});
        }
    };
    Login.prototype.login = function (e) {
        this.props.login(this.state.email, this.state.password);
    };
    Login.prototype.render = function () {
        return (React.createElement("article", {"className": "login container"}, React.createElement("h1", {"className": "login title"}, "Login"), React.createElement("section", {"className": "login input-area"}, React.createElement(Mui.TextField, {"className": "login input", "hintText": "you@example.com", "floatingLabelText": "Email address", "value": this.state.email, "onChange": this.changeEmail.bind(this)})), React.createElement("section", {"className": "login input-area"}, React.createElement(Mui.TextField, {"className": "login input", "hintText": "", "floatingLabelText": "Password", "value": this.state.password, "onChange": this.changePassword.bind(this)})), React.createElement("section", {"className": "login submit-area"}, this.detectButton()), React.createElement("p", {"className": "login state"}, this.detectMessage())));
    };
    return Login;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
Login.propTypes = {};
//# sourceMappingURL=login.js.map