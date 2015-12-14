var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var MemoIndexPager = (function (_super) {
    __extends(MemoIndexPager, _super);
    function MemoIndexPager() {
        _super.apply(this, arguments);
    }
    MemoIndexPager.prototype.render = function () {
        var _a = this.props.memoIndexData, page = _a.page, par = _a.par, total = _a.total;
        return React.createElement("ul", {"className": "memo-index pager"}, _.times(total, function (n) {
            var now = n + 1;
            return React.createElement("li", {"className": "memo-index pager-container", "key": "pager" + now}, React.createElement("a", {"className": "memo-index pager-link " + (now == page ? 'now' : 'not')}, now));
        }));
    };
    return MemoIndexPager;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexPager;
//# sourceMappingURL=memo-index-pager.js.map