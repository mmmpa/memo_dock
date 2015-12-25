/// <reference path="types/tsd.d.ts" />
var React = require('react');
var ReactDom = require('react-dom');
var Redux = require('react-redux');
var redux_router_1 = require('redux-router');
var html = document.getElementById('nojs');
var configure_store_1 = require('./store/configure-store');
var store = configure_store_1.default({ html: html });
ReactDom.render(React.createElement(Redux.Provider, {"store": store}, React.createElement(redux_router_1.ReduxRouter, null)), document.getElementById('root'));
//# sourceMappingURL=reader.js.map