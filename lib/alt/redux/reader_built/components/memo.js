var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
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
        if (hljs) {
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        }
    };
    Memo.prototype.writeTagList = function () {
        var _this = this;
        return this.props.memo.tags.map(function (tagData) {
            return React.createElement("li", {"className": "memo tag", "key": 'memoTag' + tagData.id}, React.createElement(fa_1.default, {"icon": "tag"}), _this.props.app.createTagLink(tagData.id, tagData.name));
        });
    };
    Memo.prototype.render = function () {
        var _a = this.props, windowHeight = _a.windowHeight, memoWidth = _a.memoWidth, memo = _a.memo;
        if (!memo) {
            return React.createElement("div", {"className": "memo now-loading"}, "loading...");
        }
        return React.createElement("section", {"id": "memo", "style": { height: windowHeight, width: memoWidth }, "className": "memo memo-container"}, React.createElement("header", {"className": "memo header"}, React.createElement("h1", {"className": "memo memo-title"}, memo.title), React.createElement("section", {"className": "memo tags"}, React.createElement("ul", {"className": "memo tag-list"}, this.writeTagList()))), React.createElement("div", {"className": "memo content", "dangerouslySetInnerHTML": { __html: memo.html }}));
    };
    return Memo;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map