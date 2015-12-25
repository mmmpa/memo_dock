import * as React from 'react'
import { Route } from 'react-router'
import App from './containers/app'

export default (
  <Route path="/" component={App}>
    <Route path="/memo/:memoId" component={App}/>
  </Route>
)