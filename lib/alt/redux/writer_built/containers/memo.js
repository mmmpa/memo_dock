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
var content_common_1 = require("../components/content-common");
var memo_edit_1 = require("../components/memo-edit");
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
var redux_router_1 = require('redux-router');
var menu_1 = require("../components/menu");
var Memo = (function (_super) {
    __extends(Memo, _super);
    function Memo(props) {
        _super.call(this, props);
        this.renderSlim = this.renderSlim.bind(this);
        this.save = this.save.bind(this);
    }
    Memo.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        this.loadData(this.props);
    };
    Memo.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadData(nextProps, this.props);
    };
    Memo.prototype.loadData = function (props, nowProps) {
        if (nowProps === void 0) { nowProps = null; }
        var memoData = props.state.memoData;
        var memoId = props.params.memoId;
        var memoAction = props.memoAction;
        if (memoData && this.isSameMemo(props, nowProps)) {
            return;
        }
        if (memoId) {
            memoAction.editNewMemo();
            memoAction.editMemoById(memoId);
        }
        else {
            memoAction.editNewMemo();
        }
    };
    Memo.prototype.isSameMemo = function (a, b) {
        if (!a || !b) {
            return false;
        }
        return a.params.memoId === b.params.memoId;
    };
    Memo.prototype.renderSlim = function (src) {
        this.props.memoAction.renderSlim(src);
    };
    Memo.prototype.save = function (memo) {
        this.props.memoAction.saveMemo(memo);
    };
    Memo.prototype.render = function () {
        var _a = this.props.state, memoData = _a.memoData, loginState = _a.loginState, editState = _a.editState, rendered = _a.rendered, memoMessage = _a.memoMessage;
        var _b = this, renderSlim = _b.renderSlim, save = _b.save, createIndexLink = _b.createIndexLink, createNewMemoLink = _b.createNewMemoLink, logOut = _b.logOut;
        var app = { renderSlim: renderSlim, save: save };
        if (!memoData || loginState !== status_1.LoginState.LoggedIn) {
            return React.createElement("div", null, "initializing...");
        }
        return React.createElement("article", {"className": "memo-edit"}, React.createElement(menu_1.default, React.__spread({}, { createIndexLink: createIndexLink, createNewMemoLink: createNewMemoLink, logOut: logOut })), React.createElement(memo_edit_1.default, React.__spread({}, { app: app, memoData: memoData, editState: editState, rendered: rendered, memoMessage: memoMessage })));
    };
    return Memo;
})(content_common_1.default);
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Memo);
//# sourceMappingURL=memo.js.map