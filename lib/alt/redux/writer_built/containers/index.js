/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var redux_router_1 = require('redux-router');
var status_1 = require('../constants/status');
var menu_1 = require("../components/menu");
var memo_index_1 = require("../components/memo-index");
var content_common_1 = require("../components/content-common");
var react_router_1 = require('react-router');
var MemoAction = require("../actions/memo");
var LoginAction = require("../actions/login");
var path_manip_1 = require('../lib/path-manip');
var Index = (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        _super.call(this, props);
        this.indexMemo = this.indexMemo.bind(this);
        this.editMemo = this.editMemo.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);
    }
    Index.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        this.loadData(this.props);
    };
    Index.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadData(nextProps, this.props);
    };
    Index.prototype.loadData = function (props, nowProps) {
        if (nowProps === void 0) { nowProps = null; }
        var memoIndexData = props.state.memoIndexData;
        var memoAction = props.memoAction;
        if (memoIndexData && nowProps && this.isSameIndex(props, nowProps)) {
            return;
        }
        var _a = props.location.query, page = _a.page, tagIds = _a.tagIds;
        var pageNumber = page ? +page : 1;
        var TagIdNumbers = this.normalizeTagIds(tagIds);
        memoAction.index(TagIdNumbers, pageNumber);
    };
    Index.prototype.normalizeTagIds = function (tagIds) {
        if (!tagIds || tagIds === '') {
            return [];
        }
        return tagIds.split(',').map(function (n) { return +n; });
    };
    Index.prototype.isSameIndex = function (a, b) {
        return this.isSamePage(a, b) && this.isSameTag(a, b);
    };
    Index.prototype.isSamePage = function (a, b) {
        return a.location.query.page == b.location.query.page;
    };
    Index.prototype.isSameTag = function (a, b) {
        return a.location.query.tagIds == b.location.query.tagIds;
    };
    Index.prototype.indexMemo = function (pageNumber, tagIdNumbers) {
        if (pageNumber === void 0) { pageNumber = null; }
        if (tagIdNumbers === void 0) { tagIdNumbers = null; }
        var page = pageNumber ? pageNumber : this.props.location.query.page;
        var tagIds = tagIdNumbers ? tagIdNumbers.join(',') : this.props.location.query.tagIds;
        var path = path_manip_1.pickPath() + path_manip_1.buildQueryString({ page: page, tagIds: tagIds });
        this.props.pushState(null, path);
    };
    Index.prototype.editMemo = function (memo) {
        this.props.pushState(null, '/w/memos/' + memo.id);
    };
    Index.prototype.deleteMemo = function (memo) {
        this.props.pushState(null, '/w/memos/' + memo.id);
    };
    Index.prototype.createMemoLink = function (memoId, children) {
        var path = '/memo/' + memoId + path_manip_1.pickQueryString();
        return React.createElement(react_router_1.Link, {"to": path}, children);
    };
    Index.prototype.render = function () {
        var _a = this.props.state, loginState = _a.loginState, memoIndexData = _a.memoIndexData, memoIndexState = _a.memoIndexState;
        var _b = this, indexMemo = _b.indexMemo, editMemo = _b.editMemo, deleteMemo = _b.deleteMemo, createIndexLink = _b.createIndexLink, createNewMemoLink = _b.createNewMemoLink, logOut = _b.logOut;
        var app = { indexMemo: indexMemo, editMemo: editMemo, deleteMemo: deleteMemo };
        if (!memoIndexData || loginState !== status_1.LoginState.LoggedIn) {
            return React.createElement("div", null, "initializing...");
        }
        return React.createElement("article", {"className": "memo-index"}, React.createElement(menu_1.default, React.__spread({}, { createIndexLink: createIndexLink, createNewMemoLink: createNewMemoLink, logOut: logOut })), React.createElement(memo_index_1.default, React.__spread({}, { app: app, memoIndexData: memoIndexData, memoIndexState: memoIndexState })));
    };
    return Index;
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Index);
//# sourceMappingURL=index.js.map