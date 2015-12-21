/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_redux_1 = require('react-redux');
var mixins_1 = require("../mixins");
var router_1 = require("../router");
var status_1 = require('../constants/status');
var tag_list_1 = require("../components/tag-list");
var title_list_1 = require("../components/title-list");
var memo_1 = require("../components/memo");
require("zepto/zepto.min");
var $ = window.$;
router_1.default.initialize();
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.initialized = false;
        this.state = {
            windowHeight: 20,
            memoWidth: 0
        };
    }
    App.prototype.componentDidMount = function () {
        $(window).resize(this.resize.bind(this));
        this.resize();
    };
    App.prototype.resize = function (e) {
        if (e === void 0) { e = null; }
        var $window = $(window);
        var $tagList = $('#tagList');
        var $titleList = $('#titleList');
        var $memo = $('#memo');
        this.setState({
            windowHeight: $window.height(),
            memoWidth: $window.width() - $tagList.width() - $titleList.width()
        });
    };
    App.prototype.render = function () {
        // injected by connect
        var _a = this.props, dispatch = _a.dispatch, memo = _a.memo, titles = _a.titles, tags = _a.tags, memoState = _a.memoState, tagState = _a.tagState;
        var _b = this.state, windowHeight = _b.windowHeight, memoWidth = _b.memoWidth;
        mixins_1.default.dispatchAction = dispatch;
        mixins_1.default.RouterClass = router_1.default;
        router_1.default.dispatch = dispatch;
        status_1.AppState.tag = tagState;
        status_1.AppState.memo = memoState;
        if (!this.initialized) {
            this.initialized = true;
            window.addEventListener('popstate', function (e) { return router_1.default.goHere(false); });
            router_1.default.goHere();
        }
        return React.createElement("article", {"className": "reader-container"}, React.createElement("section", {"className": "selector-container", "style": { height: windowHeight }}, React.createElement("div", {"className": "wrapper"}, React.createElement(tag_list_1.default, {"tags": tags, "tagState": tagState, "height": windowHeight}), React.createElement(title_list_1.default, {"titles": titles, "memo": memo, "memoState": memoState, "height": windowHeight}))), React.createElement(memo_1.default, {"memo": memo, "memoState": memoState, "height": windowHeight, "width": memoWidth}));
    };
    return App;
})(React.Component);
function select(state) {
    return {
        memo: state.memo,
        titles: state.titles,
        tags: state.tag,
        memoState: state.memoState,
        tagState: state.tagState,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(select)(App);
//# sourceMappingURL=app.js.map