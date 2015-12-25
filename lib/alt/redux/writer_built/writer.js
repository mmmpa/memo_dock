/// <reference path="types/tsd.d.ts" />
var React = require('react');
var ReactDom = require('react-dom');
var ReactRedux = require('react-redux');
var app_1 = require('./containers/app');
var configureStore_1 = require('./store/configureStore');
var store = configureStore_1.default();
console.log('routed');
ReactDom.render(React.createElement(ReactRedux.Provider, {"store": store}, React.createElement(app_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=writer.js.map