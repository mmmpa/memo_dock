var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var InjectedComponent = (function (_super) {
    __extends(InjectedComponent, _super);
    function InjectedComponent() {
        _super.apply(this, arguments);
    }
    InjectedComponent.prototype.selectTag = function (tag) {
        console.log(InjectedComponent.dispatch);
        console.log(tag);
    };
    InjectedComponent.prototype.editMemo = function (memo) {
        console.log(memo);
    };
    return InjectedComponent;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InjectedComponent;
//# sourceMappingURL=injection.js.map