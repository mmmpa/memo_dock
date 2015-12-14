/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Context} from '../constants/status';
import WriterRouter from "../router";
import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import MemoEdit from "../components/memo-edit";
import { tryLogin, checkInitialState } from '../actions/login'
import * as Status from '../constants/status'
import Memo from "../models/memo";
import Mixin from "../mixins";
import {MemoIndexData} from "../models/memo-index-data";

WriterRouter.initialize();

interface IApp {
  dispatch?:Function,
  loggedIn?:boolean,
  loginState?:Status.Login,
  context?: Status.Context,
  memoIndexData?: MemoIndexData
}

class App extends Component<IApp, {}> {
  private initialized:boolean = false;

  render() {
    // injected by connect
    const { dispatch, loggedIn, loginState, context, memoIndexData} = this.props;
    Mixin.dispatch = dispatch;
    WriterRouter.dispatch = dispatch;

    if (!this.initialized) {
      this.initialized = true;
      dispatch(checkInitialState(()=> WriterRouter.goHere()));
      return <div>initializing...</div>;
    }

    switch (context) {
      case Context.Login:
        return <Login loginState={loginState}/>;
      case Context.MemoIndex:
        return <MemoIndex memoIndexData={memoIndexData}/>;
      case Context.MemoEdit:
        return <MemoEdit />;
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
    memoIndexData: state.memoIndexData,
  }
}

export default connect(select)(App)