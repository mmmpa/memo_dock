var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Portal = (function (_super) {
    __extends(Portal, _super);
    function Portal() {
        _super.apply(this, arguments);
    }
    Portal.prototype.render = function () {
        return React.createElement("section", null, React.createElement("h1", null, "MemoDock"), React.createElement("p", null, "左のメニューからコンテンツを選んでください"));
    };
    return Portal;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Portal;
//# sourceMappingURL=portal.js.map