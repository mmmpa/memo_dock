var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var mixins_1 = require("../mixins");
var fa_1 = require('../lib/components/fa');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.render = function () {
        return (React.createElement("article", {"className": "global-menu"}, React.createElement("nav", {"className": "global-menu menu-container"}, React.createElement("ul", {"className": "global-menu menu-list"}, React.createElement("li", null, React.createElement(fa_1.default, {"icon": "list"}), React.createElement("a", {"onClick": function () { return mixins_1.MemoWork.goMemoIndex(); }}, "メモ一覧")), React.createElement("li", null, React.createElement(fa_1.default, {"icon": "pencil"}), React.createElement("a", {"onClick": function () { return mixins_1.MemoWork.goNewMemo(); }}, "新規メモ")), React.createElement("li", null, React.createElement(fa_1.default, {"icon": "remove"}), React.createElement("a", {"onClick": function () { return mixins_1.LoginWork.logout(); }}, "ログアウト"))))));
    };
    return Menu;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=menu.js.map