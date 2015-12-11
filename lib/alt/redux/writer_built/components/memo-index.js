var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var MemoIndex = (function (_super) {
    __extends(MemoIndex, _super);
    function MemoIndex() {
        _super.apply(this, arguments);
    }
    MemoIndex.prototype.render = function () {
        return (React.createElement("article", null, React.createElement("h1", null, "メモインデックス")));
    };
    return MemoIndex;
})(react_1.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndex;
MemoIndex.propTypes = {};
//# sourceMappingURL=memo-index.js.map