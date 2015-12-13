/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app'
import reducers from './reducers/reducers'
// to get default with typescript
import thunkMiddleware = require("redux-thunk");
import Store = Redux.Store;

let store:Store = (applyMiddleware(thunkMiddleware)(createStore))(reducers);
let rootElement:HTMLElement = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  rootElement
);





