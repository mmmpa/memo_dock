/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var router_1 = require("../router");
var status_1 = require('../constants/status');
var login_1 = require("../components/login");
var memo_index_1 = require("../components/memo-index");
var memo_edit_1 = require("../components/memo-edit");
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
router_1.default.initialize();
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
            window.addEventListener('popstate', function (e) { return router_1.default.goHere(false); });
            works.login.checkInitialState(function () { return router_1.default.goHere(); });
            return React.createElement("div", null, "initializing...");
        }
        switch (context) {
            case status_1.Context.Login:
                return React.createElement(login_1.default, {"works": works, "loginState": loginState, "afterLoginUri": afterLoginUri});
            case status_1.Context.MemoIndex:
                return React.createElement(memo_index_1.default, {"works": works, "memoIndexData": memoIndexData});
            case status_1.Context.MemoEdit:
                return React.createElement(memo_edit_1.default, {"works": works, "memoData": memoData, "memoMessage": memoMessage, "editState": editState, "rendered": rendered});
            default:
                return React.createElement("div", null, "loading...");
        }
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
    console.log(dispatcher);
    router_1.default.dispatcher = dispatcher.works;
    return dispatcher;
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map