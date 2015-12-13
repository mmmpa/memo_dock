/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Context} from '../constants/status';
import WriterRouter from "../router";
import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import Memo from "../components/memo-edit";
import { tryLogin, checkInitialState } from '../actions/login'

class App extends Component {
  private initialized:boolean = false;
  private router:WriterRouter;

  render() {
    // injected by connect
    const { dispatch, loggedIn, loginState, context, memos } = this.props;
    this.router = new WriterRouter(dispatch);

    if (!this.initialized) {
      this.initialized = true;
      dispatch(checkInitialState(()=> this.router.goHere()));
      return <div>initializing...</div>;
    }

    switch (context) {
      case Context.Login:
        return <Login
          loginState={loginState}
          login={
            (email, password) =>{
              dispatch(tryLogin(email, password));
            }
          }
        />;
      case Context.MemoIndex:
        return <MemoIndex memos={memos}/>;
      case Context.MemoEdit:
        return <Memo />;
      default:
        return <div>loading...</div>;
    }
  }
}

function select(state) {
  return {
    loggedIn: state.loggedIn,
    loginState: state.loginState,
    context: state.context,
    memos: state.memos,
  }
}

export default connect(select)(App)