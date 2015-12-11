/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app'

import reducers from './reducers/reducers'
import WriterRouter from "./router";
let store = createStore(reducers);
let rootElement = document.getElementById('root');
let router:WriterRouter = new WriterRouter();

router.goHere();

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  rootElement
);





