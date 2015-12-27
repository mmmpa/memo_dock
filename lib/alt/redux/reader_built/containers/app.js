/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Redux = require('redux');
var react_redux_1 = require('react-redux');
var react_router_1 = require('react-router');
var tag_list_1 = require("../components/tag-list");
var title_list_1 = require("../components/title-list");
var memo_1 = require("../components/memo");
var MemoAction = require("../actions/memo");
var TagAction = require("../actions/tag");
var path_manip_1 = require('../lib/path-manip');
var memo_data_1 = require("../models/memo-data");
var redux_router_1 = require('redux-router');
require("zepto/zepto.min");
var $ = window.$;
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            windowHeight: 20,
            memoWidth: 0
        };
        this.setTitle = this.setTitle.bind(this);
        this.getPortal = this.getPortal.bind(this);
        this.createMemoLink = this.createMemoLink.bind(this);
        this.createTagLink = this.createTagLink.bind(this);
        this.selectTag = this.selectTag.bind(this);
    }
    App.prototype.componentDidMount = function () {
        $(window).resize(this.resize.bind(this));
        this.resize();
    };
    App.prototype.componentWillMount = function () {
        this.loadData(this.props);
    };
    App.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadData(nextProps, this.props);
    };
    App.prototype.createTagLink = function (tagIds, children) {
        var pathname = this.props.location.pathname;
        var path = pathname + path_manip_1.buildQueryString({ tagIds: tagIds });
        return React.createElement(react_router_1.Link, {"to": path}, children);
    };
    App.prototype.createMemoLink = function (memoId, children) {
        var search = this.props.location.search;
        var path = '/memo/' + memoId + search;
        return React.createElement(react_router_1.Link, {"to": path}, children);
    };
    App.prototype.selectTag = function (tagIdNumbers) {
        var pathname = this.props.location.pathname;
        if (tagIdNumbers.length) {
            var tagIds = tagIdNumbers.join(',');
            this.props.pushState(null, pathname, { tagIds: tagIds });
        }
        else {
            this.props.pushState(null, pathname);
        }
    };
    App.prototype.loadData = function (props, nowProps) {
        if (nowProps === void 0) { nowProps = null; }
        var params = props.params, location = props.location;
        var memo = props.state.memo;
        if (params.memoId && !this.isSameMemoId(props, nowProps)) {
            var memoId = +params.memoId;
            props.memoAction.show(memoId);
        }
        else if (!memo) {
            var portalMemo = new memo_data_1.default();
            var portal = this.getPortal();
            portalMemo.title = portal.title;
            portalMemo.html = portal.html;
            props.memoAction.showMemoData(portalMemo);
        }
        if (memo) {
            this.setTitle(memo.title);
        }
        if (!this.isSameTagIds(props, nowProps)) {
            var tagIds = this.normalizeTagIds(location.query.tagIds);
            props.tagAction.index(tagIds);
        }
    };
    App.prototype.isSameMemoId = function (a, b) {
        if (!a || !b) {
            return false;
        }
        return (a.memo && a.memo == b.memo) || a.params.memoId === b.params.memoId;
    };
    App.prototype.isSameTagIds = function (a, b) {
        if (!a || !b) {
            return false;
        }
        return a.location.query.tagIds === b.location.query.tagIds;
    };
    App.prototype.normalizeTagIds = function (ids) {
        if (!ids) {
            return [];
        }
        return ids.split(',').map(function (n) { return +n; });
    };
    App.prototype.setTitle = function (title) {
        document.title = title;
    };
    App.prototype.getPortal = function () {
        var memo = new memo_data_1.default();
        var html = this.props.state.html;
        try {
            var title = html.getElementsByTagName('h1')[0].innerHTML;
            var portal = html.getElementsByTagName('section')[0].innerHTML;
            memo.title = title;
            memo.html = portal;
        }
        catch (e) {
            console.log(e);
        }
        return memo;
    };
    App.prototype.resize = function (e) {
        if (e === void 0) { e = null; }
        var $window = $(window);
        var $selectorContainer = $('#selectorContainer');
        this.setState({
            windowHeight: $window.height(),
            memoWidth: $window.width() - $selectorContainer.width()
        });
    };
    App.prototype.render = function () {
        var _a = this.props.state, memo = _a.memo, titles = _a.titles, tags = _a.tags, selectedTagIds = _a.selectedTagIds;
        var _b = this.state, windowHeight = _b.windowHeight, memoWidth = _b.memoWidth;
        var _c = this, getPortal = _c.getPortal, createMemoLink = _c.createMemoLink, createTagLink = _c.createTagLink, selectTag = _c.selectTag, setTitle = _c.setTitle;
        var app = { getPortal: getPortal, createMemoLink: createMemoLink, createTagLink: createTagLink, selectTag: selectTag, setTitle: setTitle };
        return React.createElement("article", {"className": "reader-container"}, React.createElement("section", {"id": "selectorContainer", "className": "selector-container", "style": { height: windowHeight }}, React.createElement("div", {"className": "wrapper"}, React.createElement(tag_list_1.default, React.__spread({}, { app: app, tags: tags, selectedTagIds: selectedTagIds, windowHeight: windowHeight })), React.createElement(title_list_1.default, React.__spread({}, { app: app, titles: titles, memo: memo, windowHeight: windowHeight })))), React.createElement(memo_1.default, React.__spread({}, { app: app, memo: memo, windowHeight: windowHeight, memoWidth: memoWidth })));
    };
    return App;
})(React.Component);
function mapDispatchToProps(dispatch) {
    return {
        memoAction: Redux.bindActionCreators(MemoAction, dispatch),
        tagAction: Redux.bindActionCreators(TagAction, dispatch),
        pushState: Redux.bindActionCreators(redux_router_1.pushState, dispatch)
    };
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map