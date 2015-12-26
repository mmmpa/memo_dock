/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import {LoginState, EditMemoState} from '../constants/status'

import ContentCommon from "../components/content-common";
import MemoEdit from "../components/memo-edit";

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";
import { pushState } from 'redux-router'
import Menu from "../components/menu";

interface IMemo {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState:Function,
  location:any,
  app:{}
}

class Memo extends ContentCommon<IMemo, {}> {
  constructor(props) {
    super(props);

    this.renderSlim = this.renderSlim.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();

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

  renderSlim(src:string) {
    this.props.memoAction.renderSlim(src);
  }

  save(memo:MemoData) {
    this.props.memoAction.saveMemo(memo);
  }

  render() {
    const {
      memoData,
      loginState,
      editState,
      rendered,
      memoMessage
      } = this.props.state;

    const {renderSlim, save, createIndexLink, createNewMemoLink, logOut} = this;

    let app = {renderSlim, save};

    if (!memoData || loginState !== LoginState.LoggedIn) {
      return <div>initializing...</div>;
    }

    return <article className="memo-edit">
      <Menu {...{createIndexLink, createNewMemoLink, logOut}}/>
      <MemoEdit {...{app, memoData, editState, rendered, memoMessage}}/>
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
)(Memo)
