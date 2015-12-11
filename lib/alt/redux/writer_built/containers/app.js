/// <reference path="../types/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var RaisedButton = require('material-ui/lib/raised-button');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        console.log(this.props);
        return (React.createElement("div", null, React.createElement(RaisedButton, {"label": "Default"})));
    };
    return App;
})(react_1.Component);
function select(state) {
    return {
        loggedIn: state.loggedIn,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(select)(App);
//# sourceMappingURL=app.js.map