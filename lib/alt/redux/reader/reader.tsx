/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import configureStore from './store/configure-store'

import App from './containers/app'


const html = document.getElementById('nojs');
const store = configureStore({html});

export default ReactDom.render(
  <Provider store={store}>
    <ReduxRouter/>
  </Provider>
  ,
  document.getElementById('root')
);

