var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var mixins_1 = require("../mixins");
var fa_1 = require('../lib/components/fa');
var TitleList = (function (_super) {
    __extends(TitleList, _super);
    function TitleList() {
        _super.apply(this, arguments);
    }
    TitleList.prototype.isActiveList = function (id) {
        return this.props.memo.id == id;
    };
    TitleList.prototype.detectActiveClass = function (id) {
        return this.isActiveList(id) ? 'title-list title display-now' : 'title-list title';
    };
    TitleList.prototype.detectIcon = function (id) {
        return this.isActiveList(id) ? null : React.createElement(fa_1.default, {"icon": 'chevron-right'});
    };
    TitleList.prototype.writeTitleList = function () {
        var _this = this;
        var titles = this.props.titles;
        return titles.map(function (memo) {
            return React.createElement("li", {"key": 'memo' + memo.id, "className": _this.detectActiveClass(memo.id)}, React.createElement("div", {"className": "chevron"}, _this.detectIcon(memo.id)), React.createElement("a", {"onClick": function () { return mixins_1.MemoWork.show(memo.id); }}, memo.title));
        });
    };
    TitleList.prototype.render = function () {
        var height = this.props.height;
        return React.createElement("section", {"id": "titleList", "style": { minHeight: height }, "className": "title-list title-list-container"}, React.createElement("ul", {"className": "title-list list"}, this.writeTitleList()));
    };
    return TitleList;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TitleList;
//# sourceMappingURL=title-list.js.map