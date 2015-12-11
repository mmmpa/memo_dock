/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app'
import reducers from './reducers/reducers'
import injectTapEventPlugin = require("react-tap-event-plugin");
// to get default with typescript
import thunkMiddleware = require("redux-thunk");

let store = (applyMiddleware(thunkMiddleware)(createStore))(reducers);
let rootElement = document.getElementById('root');

injectTapEventPlugin();

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  rootElement
);





