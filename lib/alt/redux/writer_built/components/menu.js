var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var fa_1 = require('../lib/components/fa');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.render = function () {
        var _a = this.props, createIndexLink = _a.createIndexLink, createNewMemoLink = _a.createNewMemoLink, logOut = _a.logOut;
        return (React.createElement("article", {"className": "global-menu"}, React.createElement("nav", {"className": "global-menu menu-container"}, React.createElement("ul", {"className": "global-menu menu-list"}, React.createElement("li", null, React.createElement(fa_1.default, {"icon": "list"}), createIndexLink('メモ一覧')), React.createElement("li", null, React.createElement(fa_1.default, {"icon": "pencil"}), createNewMemoLink('新規メモ')), React.createElement("li", null, React.createElement(fa_1.default, {"icon": "remove"}), React.createElement("a", {"onClick": function () { return logOut(); }}, "ログアウト"))))));
    };
    return Menu;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=menu.js.map