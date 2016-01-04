/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import {LoginState, EditMemoState} from '../constants/status'

import MemoEdit from "../components/memo-edit";

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";
import { pushState } from 'redux-router'
import Menu from "../components/menu";

import {mixParent} from "../components/eventer";
import {mixCommon} from "./content-common";


interface IMemo {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState:Function,
  location:any,
  app:{}
}

class Memo extends React.Component<IMemo, {}> {
  initializeAsEventing:Function;
  initializeCommonListener:Function;
  checkLogin:Function;

  listen(register){
    this.initializeCommonListener(register);
    register('save', (memo:MemoData)=> this.props.memoAction.saveMemo(memo));
    register('render', (src:string)=> this.props.memoAction.renderSlim(src));
  }

  constructor(props) {
    this.initializeAsEventing();
    super(props);
  }

  componentWillMount() {
    if(!this.checkLogin()){
      return;
    }

    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps, this.props)
  }

  loadData(props, nowProps = null) {
    const {memoData} = props.state;
    const {memoId} = props.params;
    const {memoAction} = props;

    if (memoData && this.isSameMemo(props, nowProps)) {
      return;
    }

    if (memoId) {
      memoAction.editNewMemo();
      memoAction.editMemoById(memoId);
    } else {
      memoAction.editNewMemo();
    }
  }

  isSameMemo(a, b) {
    if(!a || !b){
      return false;
    }
    return a.params.memoId === b.params.memoId;
  }

  render() {
    const {
      memoData,
      loginState,
      editState,
      rendered,
      memoMessage
      } = this.props.state;

    if (!memoData || loginState !== LoginState.LoggedIn) {
      return <div>initializing...</div>;
    }

    return <article className="memo-edit">
      <Menu/>
      <MemoEdit {...{memoData, editState, rendered, memoMessage}}/>
    </article>;
  }
}

mixParent(Memo);
mixCommon(Memo);

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
)(Memo)
