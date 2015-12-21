var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var TagList = (function (_super) {
    __extends(TagList, _super);
    function TagList() {
        _super.apply(this, arguments);
    }
    TagList.prototype.render = function () {
        var height = this.props.height;
        return React.createElement("section", {"id": "tagList", "style": { height: height }, "className": "tag-list tag-list-container"}, "tags");
    };
    return TagList;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagList;
//# sourceMappingURL=tag-list.js.map