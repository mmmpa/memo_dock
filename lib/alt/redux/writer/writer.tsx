/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'

import configureStore from './store/configure-store'
const store = configureStore({});

ReactDom.render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>
  ,
  document.getElementById('root')
);

