var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var fa_1 = require('../lib/components/fa');
var MemoIndexPager = (function (_super) {
    __extends(MemoIndexPager, _super);
    function MemoIndexPager() {
        _super.apply(this, arguments);
    }
    MemoIndexPager.prototype.tagRemover = function () {
        var _a = this.props, works = _a.works, isEnable = _a.isEnable;
        if (!isEnable() || !this.props.memoIndexData.isSelectedTag()) {
            return null;
        }
        return React.createElement("li", {"className": "memo-index pager-container"}, React.createElement("a", {"className": "memo-index tag-remover", "onClick": function () { return works.memo.loadMemoIndex(); }}, React.createElement(fa_1.default, {"icon": "times"}), "タグ解除"));
    };
    MemoIndexPager.prototype.render = function () {
        var isEnable = this.props.isEnable;
        var _a = this.props.memoIndexData, memos = _a.memos, page = _a.page, par = _a.par, total = _a.total, tagIds = _a.tagIds;
        return React.createElement("ul", {"className": "memo-index memo-pager"}, _.times(total, function (n) {
            var now = n + 1;
            return React.createElement("li", {"className": "memo-index pager-container", "key": "pager" + now}, React.createElement("a", {"className": "memo-index pager-link " + (now == page ? 'now' : 'not-now'), "onClick": function () { return works.memo.loadMemoIndex(tagIds, now); }, "disabled": !isEnable()}, now));
        }), this.tagRemover());
    };
    return MemoIndexPager;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexPager;
//# sourceMappingURL=memo-index-pager.js.map