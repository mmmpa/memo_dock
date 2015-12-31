/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import TagList from "../components/tag-list";
import TitleList from "../components/title-list";
import Memo from "../components/memo";
import * as MemoAction from "../actions/memo"
import * as TagAction from "../actions/tag"
import * as _ from 'lodash'
import {buildQueryString} from '../lib/path-manip'
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {} from "../mixins";
import { pushState } from 'redux-router'

require("zepto/zepto.min");
let $ = window.$;

interface IApp {
  state?:any,
  html?:HTMLElement,
  params?:any,
  pushState?:any,
  location:any
}

interface IAppState {
  windowHeight:number,
  memoWidth:number
}

class App extends React.Component<IApp, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: 20,
      memoWidth: 0
    };

    this.setTitle = this.setTitle.bind(this);
    this.getPortal = this.getPortal.bind(this);
    this.linkMemo = this.linkMemo.bind(this);
    this.linkTag = this.linkTag.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  componentDidMount() {
    $(window).resize(this.resize.bind(this));
    this.resize();
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps, this.props)
  }

  linkTag(tagIds:number){
    console.log('link tag')
    let {pathname} = this.props.location;
    let path:string = pathname + buildQueryString({tagIds});
    this.props.pushState(null, path);
  }

  linkMemo(memoId:number){
    let {search} = this.props.location;
    let path:string = '/memo/' + memoId + search;
    this.props.pushState(null, path);
  }

  selectTag(tagIdNumbers:number[]) {
    let {pathname} = this.props.location;
    if (tagIdNumbers.length) {
      let tagIds:string = tagIdNumbers.join(',');
      this.props.pushState(null, pathname, {tagIds});
    } else {
      this.props.pushState(null, pathname);
    }
  }

  loadData(props, nowProps = null) {
    let {params, location} = props;
    let {memo} = props.state;

    if (params.memoId && !this.isSameMemoId(props, nowProps)) {
      let memoId:number = +params.memoId;
      props.memoAction.show(memoId);
    }else if(!memo){
      let portalMemo = new MemoData();
      let portal = this.getPortal();
      portalMemo.title = portal.title;
      portalMemo.html = portal.html;
      props.memoAction.showMemoData(portalMemo);
    }

    if(memo){
      this.setTitle(memo.title);
    }

    if (!this.isSameTagIds(props, nowProps)) {
      let tagIds:number[] = this.normalizeTagIds(location.query.tagIds);
      props.tagAction.index(tagIds);
    }
  }

  isSameMemoId(a, b) {
    if(!a || !b){
      return false;
    }
    return (a.memo && a.memo == b.memo) || a.params.memoId === b.params.memoId;
  }

  isSameTagIds(a, b) {
    if(!a || !b){
      return false;
    }
    return a.location.query.tagIds === b.location.query.tagIds;
  }

  normalizeTagIds(ids:string):number[] {
    if (!ids) {
      return [];
    }
    return ids.split(',').map((n)=> +n);
  }

  setTitle(title:string){
    document.title = title;
  }

  getPortal():MemoData {
    let memo:MemoData = new MemoData();
    var {html} = this.props.state;
    try {
      let title:string = html.getElementsByTagName('h1')[0].innerHTML;
      let portal:string = html.getElementsByTagName('section')[0].innerHTML;
      memo.title = title;
      memo.html = portal;
    } catch (e) {
      console.log(e);
    }
    return memo;
  }

  resize(e = null) {
    let $window = $(window);
    let $selectorContainer = $('#selectorContainer');
    this.setState({
      windowHeight: $window.height(),
      memoWidth: $window.width() - $selectorContainer.width()
    })
  }

  render() {
    const {
      memo,
      titles,
      tags,
      selectedTagIds,
      } = this.props.state;
    const {
      windowHeight,
      memoWidth
      } = this.state;

    let {getPortal, linkMemo, linkTag, selectTag, setTitle} = this;
    let app = {getPortal, linkMemo, linkTag, selectTag, setTitle};

    return <article className="reader-container">
      <section id="selectorContainer" className="selector-container" style={{height: windowHeight}}>
        <div className="wrapper">
          <TagList {...{app, tags, selectedTagIds, windowHeight}}/>
          <TitleList {...{app, titles, memo, windowHeight}}/>
        </div>
      </section>
      <Memo {...{app, memo, windowHeight, memoWidth}}/>
    </article>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    memoAction: Redux.bindActionCreators(MemoAction, dispatch),
    tagAction: Redux.bindActionCreators(TagAction, dispatch),
    pushState: Redux.bindActionCreators(pushState, dispatch)
  };
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
