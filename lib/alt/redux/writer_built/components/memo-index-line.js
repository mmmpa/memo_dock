var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var memo_index_tag_link_1 = require("./memo-index-tag-link");
var fa_1 = require('../lib/components/fa');
var MemoIndexLine = (function (_super) {
    __extends(MemoIndexLine, _super);
    function MemoIndexLine() {
        _super.apply(this, arguments);
    }
    MemoIndexLine.prototype.tagLinks = function (tags) {
        var _this = this;
        if (tags === void 0) { tags = []; }
        var app = this.props.app;
        return tags.map(function (tagData) { return React.createElement(memo_index_tag_link_1.default, {"key": tagData.id, "tagData": tagData, "app": app, "isEnable": _this.props.isEnable}); });
    };
    MemoIndexLine.prototype.detectPublicText = function () {
        return this.props.memoData.isPublic ? '公開' : '下書き';
    };
    MemoIndexLine.prototype.detectLinkEnabled = function () {
        return this.props.isEnable() ? '' : 'disabled';
    };
    MemoIndexLine.prototype.render = function () {
        var _a = this.props, memoData = _a.memoData, works = _a.works;
        return React.createElement("tr", null, React.createElement("td", {"className": "title"}, React.createElement("a", {"className": this.detectLinkEnabled(), "onClick": function () { return works.memo.editMemoById(memoData.id); }}, memoData.title)), React.createElement("td", {"className": "tags"}, this.tagLinks(memoData.tags)), React.createElement("td", {"className": "public"}, this.detectPublicText()), React.createElement("td", {"className": "delete"}, React.createElement("button", {"disabled": !this.props.isEnable(), "onClick": function () { return works.memo.deleteMemo(memoData); }}, React.createElement(fa_1.default, {"icon": "trash-o"}))));
    };
    return MemoIndexLine;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexLine;
//# sourceMappingURL=memo-index-line.js.map