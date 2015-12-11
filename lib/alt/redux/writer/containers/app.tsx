/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Context from '../contexts'
import WriterRouter from "../router";
import Login from "../components/login";
import MemoIndex from "../components/memo-index";
import Memo from "../components/memo-edit";
import { tryLogin } from '../actions/login'

let router:WriterRouter = new WriterRouter();

router.goHere();


class App extends Component {
  render() {
    const { dispatch, loggedIn, context } = this.props

    if (!loggedIn) {
      return (<Login
        test="test"
        login={
            (email, password) =>{
              dispatch(tryLogin(email, password));
            }
          }
      />);
    }

    switch (context) {
      case Context.APP_LOGIN:
        return (<Login
          test="test"
          login={
            (email, password) =>{
              dispatch(tryLogin(email, password));
            }
          }
        />);
      case Context.MEMO_INDEX:
        return <MemoIndex />;
      case Context.MEMO_EDIT:
        return <Memo />;
      default:
        return <div>loading...</div>;
    }
  }
}

function select(state) {
  return {
    loggedIn: state.loggedIn,
    context: state.context,
  }
}

export default connect(select)(App)