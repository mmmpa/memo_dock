var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var MemoEdit = (function (_super) {
    __extends(MemoEdit, _super);
    function MemoEdit() {
        _super.apply(this, arguments);
    }
    MemoEdit.prototype.render = function () {
        return (React.createElement("article", null, React.createElement("h1", null, "メモ編集ページ")));
    };
    return MemoEdit;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoEdit;
//# sourceMappingURL=memo-edit.js.map