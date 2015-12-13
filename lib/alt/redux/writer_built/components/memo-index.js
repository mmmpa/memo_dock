/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var memo_index_line_1 = require("./memo-index-line");
var MemoIndex = (function (_super) {
    __extends(MemoIndex, _super);
    function MemoIndex(props) {
        _super.call(this, props);
    }
    MemoIndex.prototype.memoLines = function (memos) {
        if (memos === void 0) { memos = []; }
        return memos.map(function (memo) { return React.createElement(memo_index_line_1.default, {"key": memo.id, "memo": memo}); });
    };
    MemoIndex.prototype.render = function () {
        console.log(this.memoLines(this.props.memos));
        return (React.createElement("article", null, React.createElement("h1", null, "メモインデックス"), React.createElement("table", {"className": "memo-index index-table"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "タイトル"), React.createElement("th", null, "タグ"), React.createElement("th", null, "公開"))), React.createElement("tbody", null, this.props.memos.map(function (memo) { return React.createElement(memo_index_line_1.default, {"key": memo.id, "memo": memo}); })))));
    };
    return MemoIndex;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndex;
MemoIndex.propTypes = {};
//# sourceMappingURL=memo-index.js.map