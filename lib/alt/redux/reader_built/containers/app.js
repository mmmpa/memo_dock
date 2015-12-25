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
        var path = path_manip_1.pickPath() + path_manip_1.buildQueryString({ tagIds: tagIds });
        return React.createElement(react_router_1.Link, {"to": path}, children);
    };
    App.prototype.createMemoLink = function (memoId, children) {
        var path = '/memo/' + memoId + path_manip_1.pickQueryString();
        return React.createElement(react_router_1.Link, {"to": path}, children);
    };
    App.prototype.selectTag = function (tagIdNumbers) {
        if (tagIdNumbers.length) {
            var tagIds = tagIdNumbers.join(',');
            var path = path_manip_1.pickPath() + path_manip_1.buildQueryString({ tagIds: tagIds });
            this.props.pushState(null, path);
        }
        else {
            var path = path_manip_1.pickPath();
            this.props.pushState(null, path);
        }
    };
    App.prototype.loadData = function (props, nowProps) {
        if (nowProps === void 0) { nowProps = null; }
        var params = props.params, location = props.location;
        if (!nowProps || !this.isSameMemoId(props, nowProps)) {
            var memoId = +params.memoId;
            props.memoAction.show(memoId);
        }
        if (!nowProps || !this.isSameTagIds(props, nowProps)) {
            var tagIds = this.normalizeTagIds(location.query.tagIds);
            props.tagAction.index(tagIds);
        }
    };
    App.prototype.isSameMemoId = function (a, b) {
        return a.params.memoId === b.params.memoId;
    };
    App.prototype.isSameTagIds = function (a, b) {
        return a.location.query.tagIds === b.location.query.tagIds;
    };
    App.prototype.normalizeTagIds = function (ids) {
        if (!ids) {
            return [];
        }
        return ids.split(',').map(function (n) { return +n; });
    };
    App.prototype.getPortal = function () {
        var memo = new memo_data_1.default();
        var html = this.props.html;
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
        console.log(this.props);
        var _a = this.props.state, memo = _a.memo, titles = _a.titles, tags = _a.tags, memoState = _a.memoState, tagState = _a.tagState, selectedTagIds = _a.selectedTagIds;
        var app = this.props.app;
        var _b = this.state, windowHeight = _b.windowHeight, memoWidth = _b.memoWidth;
        app.getPortal = this.getPortal.bind(this);
        app.createMemoLink = this.createMemoLink.bind(this);
        app.createTagLink = this.createTagLink.bind(this);
        app.selectTag = this.selectTag.bind(this);
        status_1.AppState.tag = tagState;
        status_1.AppState.memo = memoState;
        return React.createElement("article", {"className": "reader-container"}, React.createElement("section", {"id": "selectorContainer", "className": "selector-container", "style": { height: windowHeight }}, React.createElement("div", {"className": "wrapper"}, React.createElement(tag_list_1.default, {"app": app, "tags": tags, "tagState": tagState, "selectedTagIds": selectedTagIds, "height": windowHeight}), React.createElement(title_list_1.default, {"app": app, "titles": titles, "memo": memo, "memoState": memoState, "height": windowHeight}))), React.createElement(memo_1.default, {"app": app, "memo": memo, "memoState": memoState, "height": windowHeight, "width": memoWidth}));
    };
    return App;
})(React.Component);
function mapDispatchToProps(dispatch) {
    return {
        memoAction: Redux.bindActionCreators(MemoAction, dispatch),
        tagAction: Redux.bindActionCreators(TagAction, dispatch),
        app: {
            setTitle: function (title) {
                document.title = title;
            },
            getPortal: function () { return new memo_data_1.default(); }
        },
        pushState: Redux.bindActionCreators(redux_router_1.pushState, dispatch)
    };
}
function mapStateToProps(state) {
    return { state: state };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map