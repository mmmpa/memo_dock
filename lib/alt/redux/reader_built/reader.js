/// <reference path="types/tsd.d.ts" />
var React = require('react');
var ReactDom = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var thunkMiddleware = require("redux-thunk");
var app_1 = require('./containers/app');
var reducers_1 = require('./reducers/reducers');
var mixins_1 = require("./mixins");
var store = (Redux.applyMiddleware(thunkMiddleware)(Redux.createStore))(reducers_1.default);
mixins_1.MemoWork.nojs = document.getElementById('nojs');
ReactDom.render(React.createElement(ReactRedux.Provider, {"store": store}, React.createElement(app_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=reader.js.map