/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { connect } from 'react-redux'
import Mixin from "../mixins";
import Router from "../router";
import {AppState, LoginState, Context, EditMemoState, MemoIndexState} from '../constants/status'

import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import MemoEdit from "../components/memo-edit";

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";
import {LoginWork} from "../mixins";

Router.initialize();

interface IApp {
  dispatch?:Function,
  loginState?:LoginState,
  context?: Context,
  memoData?: MemoData,
  memoIndexData?: MemoIndexData,
  rendered?:string,
  editState?:EditMemoState,
  memoMessage?:any,
  memoIndexState?:MemoIndexState,
  afterLoginUri?:string
}


class App extends React.Component<IApp, {}> {
  private initialized:boolean = false;

  render() {
    // injected by connect
    const {
      dispatch,
      loginState,
      context,
      memoIndexData,
      memoData,
      editState,
      rendered,
      memoMessage,
      memoIndexState,
      afterLoginUri
      } = this.props;

    Mixin.dispatchAction = dispatch;
    Mixin.RouterClass = Router;
    Router.dispatch = dispatch;

    AppState.login = loginState;
    AppState.edit = editState;
    AppState.index = memoIndexState;

    if (!this.initialized) {
      this.initialized = true;
      window.addEventListener('popstate', (e)=> Router.goHere(false));
      LoginWork.checkInitialState(()=> Router.goHere());
      return <div>initializing...</div>;
    }

    switch (context) {
      case Context.Login:
        return <Login loginState={loginState} afterLoginUri={afterLoginUri}/>;
      case Context.MemoIndex:
        return <MemoIndex memoIndexData={memoIndexData}/>;
      case Context.MemoEdit:
        return <MemoEdit
          memoData={memoData}
          memoMessage={memoMessage}
          editState={editState}
          rendered={rendered}
        />;
      default:
        return <div>loading...</div>;
    }
  }
}

function select(state) {
  return {
    loginState: state.loginState,
    context: state.context,
    memoIndexData: state.memoIndexData,
    memoData: state.memoData,
    rendered: state.rendered,
    memoMessage: state.memoMessage,
    editState: state.editState,
    memoIndexState: state.memoIndexState,
    afterLoginUri: state.afterLoginUri
  }
}

export default connect(select)(App)