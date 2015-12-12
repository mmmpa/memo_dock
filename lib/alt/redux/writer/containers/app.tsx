/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Context} from '../constants/status';
import WriterRouter from "../router";
import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import Memo from "../components/memo-edit";
import { tryLogin } from '../actions/login'

let router:WriterRouter = new WriterRouter();

router.goHere();


class App extends Component {
  render() {
    // injected by connect
    const { dispatch, loggedIn, loginState, context } = this.props;

    if (!loggedIn) {
      return (<Login
        loginState={loginState}
        login={
            (email, password) =>{
              dispatch(tryLogin(email, password));
            }
          }
      />);
    }

    switch (context) {
      case Context.Login:
        return (<Login
          test="test"
          login={
            (email, password) =>{
              dispatch(tryLogin(email, password));
            }
          }
        />);
      case Context.MemoIndex:
        return <MemoIndex />;
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
  }
}

export default connect(select)(App)