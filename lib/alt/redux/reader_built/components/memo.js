var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var fa_1 = require('../lib/components/fa');
var mixins_1 = require("../mixins");
var Memo = (function (_super) {
    __extends(Memo, _super);
    function Memo() {
        _super.apply(this, arguments);
    }
    Memo.prototype.componentDidUpdate = function () {
        if (this.props.memo.html === '') {
            var portal = mixins_1.MemoWork.getPortal();
            this.props.memo.title = portal.title;
            this.props.memo.html = portal.html;
        }
        mixins_1.MemoWork.setTitle(this.props.memo.title);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    };
    Memo.prototype.writeTagList = function () {
        var _this = this;
        return this.props.memo.tags.map(function (tagData) {
            return React.createElement("li", {"className": "memo tag", "key": 'memoTag' + tagData.id}, React.createElement(fa_1.default, {"icon": "tag"}), React.createElement("a", {"onClick": function () { return _this.props.works.tag.index([tagData.id]); }}, tagData.name));
        });
    };
    Memo.prototype.render = function () {
        var _a = this.props, height = _a.height, width = _a.width, memo = _a.memo;
        return React.createElement("section", {"id": "memo", "style": { height: height, width: width }, "className": "memo memo-container"}, React.createElement("header", {"className": "memo header"}, React.createElement("h1", {"className": "memo memo-title"}, memo.title), React.createElement("section", {"className": "memo tags"}, React.createElement("ul", {"className": "memo tag-list"}, this.writeTagList()))), React.createElement("div", {"dangerouslySetInnerHTML": { __html: memo.html }}));
    };
    return Memo;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map