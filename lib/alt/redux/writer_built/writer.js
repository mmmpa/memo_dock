/// <reference path="types/tsd.d.ts" />
var React = require('react');
var ReactDom = require('react-dom');
var ReactRedux = require('react-redux');
var redux_router_1 = require('redux-router');
var configure_store_1 = require('./store/configure-store');
var store = configure_store_1.default({});
ReactDom.render(React.createElement(ReactRedux.Provider, {"store": store}, React.createElement(redux_router_1.ReduxRouter, null)), document.getElementById('root'));
//# sourceMappingURL=writer.js.map