/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var Context = require('../contexts');
var router_1 = require("../router");
var login_1 = require("../components/login");
var memo_index_1 = require("../components/memo-index");
var memo_edit_1 = require("../components/memo-edit");
var login_2 = require('../actions/login');
var router = new router_1.default();
router.goHere();
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        var _a = this.props, dispatch = _a.dispatch, loggedIn = _a.loggedIn, context = _a.context;
        if (!loggedIn) {
            return (React.createElement(login_1.default, {"test": "test", "login": function (email, password) {
                dispatch(login_2.tryLogin(email, password));
            }}));
        }
        switch (context) {
            case Context.APP_LOGIN:
                return (React.createElement(login_1.default, {"test": "test", "login": function (email, password) {
                    dispatch(login_2.tryLogin(email, password));
                }}));
            case Context.MEMO_INDEX:
                return React.createElement(memo_index_1.default, null);
            case Context.MEMO_EDIT:
                return React.createElement(memo_edit_1.default, null);
            default:
                return React.createElement("div", null, "loading...");
        }
    };
    return App;
})(react_1.Component);
function select(state) {
    return {
        loggedIn: state.loggedIn,
        context: state.context,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(select)(App);
//# sourceMappingURL=app.js.map