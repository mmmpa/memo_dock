/// <reference path="types/tsd.d.ts" />

import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRedux from 'react-redux'

import App from './containers/app'

import configureStore from './store/configureStore'
const store = configureStore();

console.log('routed')

ReactDom.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>
  ,
  document.getElementById('root')
);





