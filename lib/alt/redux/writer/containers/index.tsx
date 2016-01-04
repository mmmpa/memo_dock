/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import {LoginState, MemoIndexState} from '../constants/status'

import Menu from "../components/menu";
import MemoIndex from "../components/memo-index";
import { Link } from 'react-router';

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"

import MemoData from "../models/memo-data";
import MemoIndexData from "../models/memo-index-data";

import {mixParent} from "../components/eventer";
import {mixCommon} from "./content-common";

interface IIndex {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState:Function,
  location:any
}

interface IIndexState {
  reloadForce:boolean
}

class Index extends React.Component<IIndex, IIndexState> {
  initializeAsEventing:Function;
  initializeCommonListener:Function;
  checkLogin:Function;

  listen(register) {
    this.initializeCommonListener(register);
    register('index:page', (page:number)=> this.indexMemo(page, null));
    register('index:tag', (tags:number[])=> this.indexMemo(null, tags));
    register('index:reset', ()=> this.indexMemo(1, []));
    register('memo:edit', (id:number)=> this.editMemo(id));
    register('memo:delete', (id:number)=> this.deleteMemo(id));
  }

  constructor(props) {
    this.initializeAsEventing();
    super(props);

    this.state = {
      reloadForce: false
    };
  }

  componentWillMount() {
    if (!this.checkLogin()) {
      return;
    }

    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps, this.props)
  }

  loadData(props, nowProps = null) {
    const {memoIndexData} = props.state;
    const {memoAction} = props;
    const {reloadForce} = this.state;

    if (!reloadForce && memoIndexData && nowProps && this.isSameIndex(props, nowProps)) {
      return;
    }
    this.setState({reloadForce: false});

    let {page, tagIds} = props.location.query;
    let pageNumber:number = page ? +page : 1;
    let TagIdNumbers:number[] = this.normalizeTagIds(tagIds);
    memoAction.index(TagIdNumbers, pageNumber);
  }

  normalizeTagIds(tagIds:string):number[] {
    if (!tagIds || tagIds === '') {
      return [];
    }
    return tagIds.split(',').map((n)=> +n);
  }

  isSameIndex(a, b) {
    return this.isSamePage(a, b) && this.isSameTag(a, b)
  }

  isSamePage(a, b) {
    return a.location.query.page == b.location.query.page;
  }

  isSameTag(a, b) {
    return a.location.query.tagIds == b.location.query.tagIds;
  }


  indexMemo(pageNumber:number = null, tagIdNumbers:number[] = null) {
    let {pathname, query} = this.props.location;

    let page = pageNumber ? pageNumber : query.page;
    let tagIds = tagIdNumbers ? tagIdNumbers.join(',') : query.tagIds;

    this.props.pushState(null, pathname, {page, tagIds});
  }

  editMemo(memoId:number) {
    this.props.pushState(null, '/w/memos/' + memoId);
  }

  deleteMemo(memoId:number) {
    this.props.memoAction.deleteMemo(memoId, ()=> {
      this.loadData(this.props);
    });
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
      <Menu />
      <MemoIndex {...{memoIndexData, memoIndexState}}/>
    </article>;
  }
}

mixParent(Index);
mixCommon(Index);

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
