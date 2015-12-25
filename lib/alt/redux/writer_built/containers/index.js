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
var memo_index_1 = require("../components/memo-index");
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
var redux_router_1 = require('redux-router');
var link_1 = require('../components/link');
var menu_1 = require("../components/menu");
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        _super.apply(this, arguments);
    }
    Index.prototype.componentWillMount = function () {
        var loginState = this.props.state.loginState;
        var _a = this.props, memoAction = _a.memoAction, pushState = _a.pushState;
        if (loginState !== status_1.LoginState.LoggedIn) {
            memoAction.checkLogin(null, function () {
                pushState(null, '/w');
            });
        }
        else {
            this.loadData(this.props);
        }
    };
    Index.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadData(nextProps, this.props);
    };
    Index.prototype.loadData = function (props, nowProps) {
        if (nowProps === void 0) { nowProps = null; }
        var memoIndexData = this.props.state.memoIndexData;
        var memoAction = this.props.memoAction;
        if (!memoIndexData) {
            memoAction.index();
        }
    };
    Index.prototype.render = function () {
        var _a = this.props.state, loginState = _a.loginState, memoIndexData = _a.memoIndexData, memoIndexState = _a.memoIndexState;
        if (!memoIndexData || loginState !== status_1.LoginState.LoggedIn) {
            return React.createElement("div", null, "initializing...");
        }
        return React.createElement("article", {"className": "memo-index"}, React.createElement(menu_1.default, React.__spread({}, { createIndexLink: link_1.createIndexLink, createNewMemoLink: link_1.createNewMemoLink })), React.createElement(memo_index_1.default, React.__spread({}, { memoIndexData: memoIndexData, memoIndexState: memoIndexState })));
    };
    return Index;
})(React.Component);
function mapDispatchToProps(dispatch) {
    return {
        memoAction: Redux.bindActionCreators(MemoAction, dispatch),
        loginAction: Redux.bindActionCreators(LoginAction, dispatch),
        pushState: Redux.bindActionCreators(redux_router_1.pushState, dispatch).bind(this)
    };
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Index);
//# sourceMappingURL=index.js.map