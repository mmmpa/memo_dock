var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var fa_1 = require('../lib/components/fa');
var eventer_1 = require("../components/eventer");
var MemoIndexPager = (function (_super) {
    __extends(MemoIndexPager, _super);
    function MemoIndexPager() {
        _super.apply(this, arguments);
    }
    MemoIndexPager.prototype.index = function (page) {
        this.dispatch('index:page', page);
    };
    MemoIndexPager.prototype.reset = function () {
        this.dispatch('index:reset');
    };
    MemoIndexPager.prototype.tagRemover = function () {
        var _this = this;
        var isSelectedTag = this.props.memoIndexData.isSelectedTag;
        var classString = isSelectedTag() ? "memo-index pager-container" : "memo-index pager-container hidden";
        return React.createElement("li", {"className": classString}, React.createElement("a", {"className": "memo-index tag-remover", "onClick": function () { return _this.reset(); }}, React.createElement(fa_1.default, {"icon": "times"}), "タグ解除"));
    };
    MemoIndexPager.prototype.render = function () {
        var _this = this;
        var isEnable = this.props.isEnable;
        var _a = this.props.memoIndexData, page = _a.page, total = _a.total;
        return React.createElement("ul", {"className": "memo-index memo-pager"}, _.times(total, function (n) {
            var now = n + 1;
            return React.createElement("li", {"className": "memo-index pager-container", "key": "pager" + now}, React.createElement("a", {"className": "memo-index pager-link " + (now == page ? 'now' : 'not-now'), "onClick": function () { return _this.index(now); }, "disabled": !isEnable}, now));
        }), this.tagRemover());
    };
    return MemoIndexPager;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexPager;
eventer_1.mixChild(MemoIndexPager);
//# sourceMappingURL=memo-index-pager.js.map