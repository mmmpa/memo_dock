/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var status_1 = require('../constants/status');
var router_1 = require("../router");
var login_1 = require("../components/login");
var memo_index_1 = require("../components/memo-index");
var memo_edit_1 = require("../components/memo-edit");
var login_2 = require('../actions/login');
var mixins_1 = require("../mixins");
router_1.default.initialize();
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
        this.initialized = false;
    }
    App.prototype.render = function () {
        // injected by connect
        var _a = this.props, dispatch = _a.dispatch, loggedIn = _a.loggedIn, loginState = _a.loginState, context = _a.context, memoIndexData = _a.memoIndexData;
        mixins_1.default.dispatch = dispatch;
        router_1.default.dispatch = dispatch;
        if (!this.initialized) {
            this.initialized = true;
            dispatch(login_2.checkInitialState(function () { return router_1.default.goHere(); }));
            return React.createElement("div", null, "initializing...");
        }
        switch (context) {
            case status_1.Context.Login:
                return React.createElement(login_1.default, {"loginState": loginState});
            case status_1.Context.MemoIndex:
                return React.createElement(memo_index_1.default, {"memoIndexData": memoIndexData});
            case status_1.Context.MemoEdit:
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
        loginState: state.loginState,
        context: state.context,
        memoIndexData: state.memoIndexData,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(select)(App);
//# sourceMappingURL=app.js.map