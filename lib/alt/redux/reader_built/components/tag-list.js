var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var React = require('react');
var TagList = (function (_super) {
    __extends(TagList, _super);
    function TagList() {
        _super.apply(this, arguments);
    }
    TagList.prototype.isSelected = function (id) {
        return _.include(this.props.selectedTagIds, id);
    };
    TagList.prototype.toggle = function (id) {
        this.props.works.tag.index(this.generateNextTagIds(id));
    };
    TagList.prototype.generateNextTagIds = function (id) {
        var selectedTagIds = this.props.selectedTagIds;
        if (this.isSelected(id)) {
            return _.without(selectedTagIds, id);
        }
        else {
            var ids = selectedTagIds.concat();
            ids.push(id);
            return ids;
        }
    };
    TagList.prototype.writeTagList = function () {
        var _this = this;
        var tags = this.props.tags;
        return tags.map(function (tag) {
            return React.createElement("li", {"key": 'memo' + tag.id}, React.createElement("label", null, React.createElement("span", {"className": "check"}, React.createElement("input", {"type": "checkbox", "checked": _this.isSelected(tag.id), "onChange": function () { return _this.toggle(tag.id); }})), React.createElement("span", {"className": "text"}, tag.name)));
        });
    };
    TagList.prototype.render = function () {
        var height = this.props.height;
        return React.createElement("section", {"id": "tagList", "style": { height: height }, "className": "tag-list tag-list-container"}, React.createElement("ul", {"className": "tag-list list"}, this.writeTagList()));
    };
    return TagList;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagList;
//# sourceMappingURL=tag-list.js.map