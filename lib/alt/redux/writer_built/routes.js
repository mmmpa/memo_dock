var React = require('react');
var react_router_1 = require('react-router');
var login_1 = require('./containers/login');
var memo_1 = require('./containers/memo');
var index_1 = require('./containers/index');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, null, React.createElement(react_router_1.Route, {"path": "/w", "component": login_1.default}), React.createElement(react_router_1.Route, {"path": "/w/memos/", "component": index_1.default}), React.createElement(react_router_1.Route, {"path": "/w/memos/new", "component": memo_1.default}), React.createElement(react_router_1.Route, {"path": "/w/memos/:memoId", "component": memo_1.default})));
//# sourceMappingURL=routes.js.map