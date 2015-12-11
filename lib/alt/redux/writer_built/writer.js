/// <reference path="types/tsd.d.ts" />
var React = require('react');
var react_dom_1 = require('react-dom');
var redux_1 = require('redux');
var react_redux_1 = require('react-redux');
var app_1 = require('./containers/app');
var reducers_1 = require('./reducers/reducers');
var router_1 = require("./router");
var store = redux_1.createStore(reducers_1.default);
var rootElement = document.getElementById('root');
var router = new router_1.default();
router.goHere();
react_dom_1.render(React.createElement(react_redux_1.Provider, {"store": store}, React.createElement(app_1.default, null)), rootElement);
//# sourceMappingURL=writer.js.map