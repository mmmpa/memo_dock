import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app'

let rootElement = document.getElementById('root');
console.log(rootElement)
render(
  <App />
  ,
  rootElement
);






