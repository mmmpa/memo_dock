var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Memo = (function (_super) {
    __extends(Memo, _super);
    function Memo() {
        _super.apply(this, arguments);
    }
    Memo.prototype.render = function () {
        var _a = this.props, height = _a.height, width = _a.width, memo = _a.memo;
        return React.createElement("section", {"id": "memo", "style": { height: height, width: width }, "className": "memo memo-container"}, React.createElement("div", {"dangerouslySetInnerHTML": { __html: memo.html }}));
    };
    return Memo;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map