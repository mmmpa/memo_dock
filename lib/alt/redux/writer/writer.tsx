/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as Redux from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route} from 'react-router'

import configureStore from './store/configure-store'
const store = configureStore({});

ReactDom.render(
  <ReactRedux.Provider store={store}>
    <ReduxRouter />
  </ReactRedux.Provider>
  ,
  document.getElementById('root')
);

