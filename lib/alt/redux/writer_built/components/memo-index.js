/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var menu_1 = require("./menu");
var memo_index_line_1 = require("./memo-index-line");
var memo_index_pager_1 = require("./memo-index-pager");
var fa_1 = require('../lib/components/fa');
var MemoIndex = (function (_super) {
    __extends(MemoIndex, _super);
    function MemoIndex(props) {
        _super.call(this, props);
    }
    MemoIndex.prototype.memoLines = function () {
        var memos = this.props.memoIndexData.memos;
        return memos.map(function (memoData) { return React.createElement(memo_index_line_1.default, {"key": memoData.id, "memoData": memoData}); });
    };
    MemoIndex.prototype.loading = function (memos) {
        if (memos === void 0) { memos = []; }
        if (!memos || memos.length === 0) {
            return React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"});
        }
        else {
            return null;
        }
    };
    MemoIndex.prototype.render = function () {
        var memos = this.props.memoIndexData.memos;
        var memoIndexData = this.props.memoIndexData;
        return (React.createElement("article", {"className": "memo-index"}, React.createElement(menu_1.default, null), React.createElement("section", {"className": "memo-index index-container"}, React.createElement("h1", {"className": "memo-index index-title"}, "メモ一覧"), React.createElement(memo_index_pager_1.default, React.__spread({}, this.props)), React.createElement("table", {"className": "memo-index index-table"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {"className": "title"}, "タイトル"), React.createElement("th", {"className": "tags"}, "タグ"), React.createElement("th", {"className": "public"}, "公開"), React.createElement("th", {"className": "delete"}, " "))), React.createElement("tbody", null, this.memoLines())), this.loading(memos), React.createElement(memo_index_pager_1.default, React.__spread({}, this.props)))));
    };
    return MemoIndex;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndex;
//# sourceMappingURL=memo-index.js.map