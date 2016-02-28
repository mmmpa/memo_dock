var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var fa_1 = require('../lib/components/fa');
var hljs = window.hljs;
var Memo = (function (_super) {
    __extends(Memo, _super);
    function Memo() {
        _super.apply(this, arguments);
    }
    Memo.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Memo.prototype.componentDidUpdate = function () {
        if (this.refs['container']) {
            ReactDOM.findDOMNode(this.refs['container']).scrollTop = 0;
        }
        if (hljs) {
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        }
    };
    Memo.prototype.writeTagList = function () {
        var app = this.props.app;
        return this.props.memo.tags.map(function (tagData) {
            return React.createElement("li", {"className": "memo tag", "key": 'memoTag' + tagData.id}, React.createElement(fa_1.default, {"icon": "tag"}), React.createElement("a", {"onClick": function () { return app.linkTag(tagData.id); }}, tagData.name));
        });
    };
    Memo.prototype.render = function () {
        var _a = this.props, windowHeight = _a.windowHeight, memoWidth = _a.memoWidth, memo = _a.memo;
        if (!memo) {
            return React.createElement("div", {"className": "memo now-loading"}, "loading...");
        }
        return React.createElement("section", {"id": "memo", "style": { height: windowHeight, width: memoWidth }, "className": "memo memo-container", "ref": "container"}, React.createElement("header", {"className": "memo header"}, React.createElement("h1", {"className": "memo memo-title"}, memo.title), React.createElement("section", {"className": "memo tags"}, React.createElement("ul", {"className": "memo tag-list"}, this.writeTagList())), React.createElement("section", {"className": "memo last-update"}, "更新: ", React.createElement("em", {"className": "time"}, memo.update))), React.createElement("div", {"className": "memo content", "dangerouslySetInnerHTML": { __html: memo.html }}));
    };
    return Memo;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map