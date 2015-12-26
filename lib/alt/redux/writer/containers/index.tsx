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
import {pickQueryString, pickPath, buildQueryString} from '../lib/path-manip'

interface IApp {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState:Function,
  app:{}
}

class Index extends React.Component<IApp, {}> {
  constructor(props) {
    super(props);

    this.indexMemo = this.indexMemo.bind(this);
  }

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
    const {memoIndexData} = props.state;
    const {memoAction} = props;

    if (memoIndexData && this.isSameIndex(props, nowProps)) {
      return;
    }

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
    let page = pageNumber ? pageNumber : this.props.location.query.page;
    let tagIds = tagIdNumbers ? tagIdNumbers.join(',') : this.props.location.query.tagIds;
    let path:string = pickPath() + buildQueryString({page, tagIds});
    this.props.pushState(null, path);
  }

  createMemoLink(memoId:number, children:any) {
    let path:string = '/memo/' + memoId + pickQueryString();
    return <Link to={path}>{children}</Link>
  }


  render() {
    const {
      loginState,
      memoIndexData,
      memoIndexState
      } = this.props.state;

    let app = {
      indexMemo: this.indexMemo
    }

    if (!memoIndexData || loginState !== LoginState.LoggedIn) {
      return <div>initializing...</div>;
    }

    return <article className="memo-index">
      <Menu {...{createIndexLink, createNewMemoLink}}/>
      <MemoIndex {...{app, memoIndexData, memoIndexState}}/>
    </article>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    memoAction: Redux.bindActionCreators(MemoAction, dispatch),
    loginAction: Redux.bindActionCreators(LoginAction, dispatch),
    pushState: Redux.bindActionCreators(pushState, dispatch).bind(this),
    app: {}
  };
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
