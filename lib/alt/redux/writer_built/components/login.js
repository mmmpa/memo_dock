var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        _super.apply(this, arguments);
    }
    Login.prototype.render = function () {
        console.log(this.props);
        return (React.createElement("article", null, React.createElement("h1", null, "ログインページ"), React.createElement(RaisedButton, {"label": "Primary", "primary": true, "onTouchTap": this.props.login})));
    };
    return Login;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
Login.propTypes = {};
//# sourceMappingURL=login.js.map