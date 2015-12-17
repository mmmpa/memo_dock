/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var mixins_1 = require("../mixins");
var MemoIndexTagLink = (function (_super) {
    __extends(MemoIndexTagLink, _super);
    function MemoIndexTagLink(props) {
        _super.call(this, props);
    }
    MemoIndexTagLink.prototype.render = function () {
        var tag = this.props.tag;
        return (React.createElement("div", {"className": "memo-index tag-link-container"}, React.createElement("a", {"className": "memo-index tag-link", "onClick": function () { return mixins_1.MemoMix.goTaggedIndex(tag); }}, tag.name)));
    };
    return MemoIndexTagLink;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexTagLink;
//# sourceMappingURL=memo-index-tag-link.js.map