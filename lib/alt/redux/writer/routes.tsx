import * as React from 'react'
import { Route } from 'react-router'
import Login from './containers/login'
import Memo from './containers/memo'
import Index from './containers/index'

export default (
  <Route>
    <Route path="/w" component={Login}/>
    <Route path="/w/memos/" component={Index}/>
    <Route path="/w/memos/new" component={Memo}/>
    <Route path="/w/memos/:memoId" component={Memo}/>
  </Route>
)
