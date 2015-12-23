/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import thunkMiddleware = require("redux-thunk");

import App from './containers/app'
import reducers from './reducers/reducers'
import {MemoWork} from "./mixins";

let store:Redux.Store = (Redux.applyMiddleware(thunkMiddleware)(Redux.createStore))(reducers);
MemoWork.nojs = document.getElementById('nojs');

ReactDom.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>
  ,
  document.getElementById('root')
);




