var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var memo_index_tag_link_1 = require("./memo-index-tag-link");
var mixins_1 = require("../mixins");
var MemoIndexLine = (function (_super) {
    __extends(MemoIndexLine, _super);
    function MemoIndexLine() {
        _super.apply(this, arguments);
    }
    MemoIndexLine.prototype.tagLinks = function (tags) {
        if (tags === void 0) { tags = []; }
        return tags.map(function (tag) { return React.createElement(memo_index_tag_link_1.default, {"key": tag.id, "tag": tag}); });
    };
    MemoIndexLine.prototype.detectPublicText = function () {
        return this.props.memo.isPublic ? '公開' : '下書き';
    };
    MemoIndexLine.prototype.render = function () {
        var memo = this.props.memo;
        return React.createElement("tr", null, React.createElement("td", {"className": "title"}, React.createElement("a", {"onClick": function () { return mixins_1.MemoMix.editMemo(memo); }}, memo.title)), React.createElement("td", {"className": "tags"}, this.tagLinks(memo.tags)), React.createElement("td", {"className": "public"}, this.detectPublicText()));
    };
    return MemoIndexLine;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexLine;
//# sourceMappingURL=memo-index-line.js.map