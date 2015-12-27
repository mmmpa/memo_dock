var React = require('react');
var react_router_1 = require('react-router');
var app_1 = require('./containers/app');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, {"path": "/", "component": app_1.default}, React.createElement(react_router_1.Route, {"path": "/memo/:memoId", "component": app_1.default})));
//# sourceMappingURL=routes.js.map