/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var MemoIndexTagLink = (function (_super) {
    __extends(MemoIndexTagLink, _super);
    function MemoIndexTagLink() {
        _super.apply(this, arguments);
    }
    MemoIndexTagLink.prototype.detectLinkEnabled = function () {
        return this.props.isEnable() ? 'memo-index tag-link' : 'memo-index tag-link disabled';
    };
    MemoIndexTagLink.prototype.render = function () {
        var _a = this.props, tagData = _a.tagData, app = _a.app;
        return (React.createElement("div", {"className": "memo-index tag-link-container"}, React.createElement("a", {"className": this.detectLinkEnabled(), "onClick": function () { return app.indexMemo(1, [tagData.id]); }}, tagData.name)));
    };
    return MemoIndexTagLink;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexTagLink;
//# sourceMappingURL=memo-index-tag-link.js.map