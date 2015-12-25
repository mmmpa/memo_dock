/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import {LoginState, MemoIndexState} from '../constants/status'

import MemoIndex from "../components/memo-index";

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";
import { pushState } from 'redux-router'
import { Link } from 'react-router';
import {createIndexLink, createNewMemoLink} from '../components/link'
import Menu from "../components/menu";

interface IApp {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState:Function
}

class Index extends React.Component<IApp, {}> {
  componentWillMount() {
    const {loginState} = this.props.state;

    const {
      memoAction,
      pushState
      } = this.props;

    if (loginState !== LoginState.LoggedIn) {
      memoAction.checkLogin(null, ()=> {
        pushState(null, '/w');
      });
    } else {
      this.loadData(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps, this.props)
  }

  loadData(props, nowProps = null) {
    const {memoIndexData} = this.props.state;
    const {memoAction} = this.props;

    if (!memoIndexData) {
      memoAction.index()
    }
  }

  render() {
    const {
      loginState,
      memoIndexData,
      memoIndexState
      } = this.props.state;

    if (!memoIndexData || loginState !== LoginState.LoggedIn) {
      return <div>initializing...</div>;
    }

    return <article className="memo-index">
      <Menu {...{createIndexLink, createNewMemoLink}}/>
      <MemoIndex {...{memoIndexData, memoIndexState}}/>
    </article>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    memoAction: Redux.bindActionCreators(MemoAction, dispatch),
    loginAction: Redux.bindActionCreators(LoginAction, dispatch),
    pushState: Redux.bindActionCreators(pushState, dispatch).bind(this)
  };
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
