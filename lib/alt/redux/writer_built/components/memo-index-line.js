var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var MemoIndexLine = (function (_super) {
    __extends(MemoIndexLine, _super);
    function MemoIndexLine() {
        _super.apply(this, arguments);
    }
    MemoIndexLine.prototype.render = function () {
        var memo = this.props.memo;
        return React.createElement("tr", null, React.createElement("td", null, memo.title), React.createElement("td", null, memo.tags.join(':')), React.createElement("td", null, memo.isPublic));
    };
    return MemoIndexLine;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexLine;
//# sourceMappingURL=memo-index-line.js.map