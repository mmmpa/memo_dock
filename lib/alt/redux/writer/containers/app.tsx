/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import Mixin from "../mixins";
import Router from "../router";
import {AppState, LoginState, Context, EditMemoState, MemoIndexState} from '../constants/status'

import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import MemoEdit from "../components/memo-edit";

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";
import {LoginWork} from "../mixins";

Router.initialize();

interface IApp {
  state?:any,
  works?:any
}

class App extends React.Component<IApp, {}> {
  private initialized:boolean = false;

  render() {
    const {
      loginState,
      context,
      memoIndexData,
      memoData,
      editState,
      rendered,
      memoMessage,
      memoIndexState,
      afterLoginUri
      } = this.props.state;
    const {works} = this.props;

    AppState.login = loginState;
    AppState.edit = editState;
    AppState.index = memoIndexState;

    if (!this.initialized) {
      this.initialized = true;
      window.addEventListener('popstate', (e)=> Router.goHere(false));
      works.login.checkInitialState(()=> Router.goHere());
      return <div>initializing...</div>;
    }

    switch (context) {
      case Context.Login:
        return <Login
          works={works}
          loginState={loginState}
          afterLoginUri={afterLoginUri}
        />;
      case Context.MemoIndex:
        return <MemoIndex
          works={works}
          memoIndexData={memoIndexData}
        />;
      case Context.MemoEdit:
        return <MemoEdit
          works={works}
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

function mapDispatchToProps(dispatch) {
  let dispatcher = {
    works: {
      memo: Redux.bindActionCreators(MemoAction, dispatch),
      login: Redux.bindActionCreators(LoginAction, dispatch)
    }
  };
  console.log(dispatcher)
  Router.dispatcher = dispatcher.works;
  return dispatcher;
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)