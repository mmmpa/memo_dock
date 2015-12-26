/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as Redux from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {Route} from 'react-router'

import App from './containers/app'

const html = document.getElementById('nojs');
import configureStore from './store/configure-store'
const store = configureStore({html});

ReactDom.render(
  <Redux.Provider store={store}>
    <ReduxRouter/>
  </Redux.Provider>
  ,
  document.getElementById('root')
);
