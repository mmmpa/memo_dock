/// <reference path="types/tsd.d.ts" />
var React = require('react');
var ReactDom = require('react-dom');
var react_redux_1 = require('react-redux');
var redux_router_1 = require('redux-router');
var configure_store_1 = require('./store/configure-store');
var html = document.getElementById('nojs');
var store = configure_store_1.default({ html: html });
console.log('reader');
ReactDom.render(React.createElement(react_redux_1.Provider, {"store": store}, React.createElement(redux_router_1.ReduxRouter, null)), document.getElementById('root'));
//# sourceMappingURL=reader.js.map