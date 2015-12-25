/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var status_1 = require('../constants/status');
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
        this.initialized = false;
    }
    App.prototype.render = function () {
        var _a = this.props.state, loginState = _a.loginState, context = _a.context, memoIndexData = _a.memoIndexData, memoData = _a.memoData, editState = _a.editState, rendered = _a.rendered, memoMessage = _a.memoMessage, memoIndexState = _a.memoIndexState, afterLoginUri = _a.afterLoginUri;
        var works = this.props.works;
        status_1.AppState.login = loginState;
        status_1.AppState.edit = editState;
        status_1.AppState.index = memoIndexState;
        if (!this.initialized) {
            this.initialized = true;
            window.addEventListener('popstate', function (e) { return Router.goHere(false); });
            works.login.checkInitialState(function () { return Router.goHere(); });
            return React.createElement("div", null, "initializing...");
        }
        return React.createElement("div", null, "memo");
    };
    return App;
})(React.Component);
function mapDispatchToProps(dispatch) {
    var dispatcher = {
        works: {
            memo: Redux.bindActionCreators(MemoAction, dispatch),
            login: Redux.bindActionCreators(LoginAction, dispatch)
        }
    };
    return dispatcher;
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=memo.js.map