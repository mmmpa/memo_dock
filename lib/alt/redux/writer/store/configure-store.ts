import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import * as createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'
import * as thunk from 'redux-thunk'
//import api from '../middleware/api'
import reducers from '../reducers/reducers'

let finalCreateStore:Function = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState){
  return finalCreateStore(reducers, initialState);
}
