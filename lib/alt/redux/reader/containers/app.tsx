/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { connect } from 'react-redux'
import Mixin from "../mixins";
import Router from "../router";
import {AppState, TagState, MemoState} from '../constants/status'

import TagList from "../components/tag-list";
import TitleList from "../components/title-list";
import Memo from "../components/memo";

import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {} from "../mixins";

require("zepto/zepto.min");
let $ = window.$;

Router.initialize();

interface IApp {
  dispatch?:Function,
  memo?:MemoData,
  titles?:MemoData[],
  tags?:TagData[],
  memoState?:MemoState,
  tagState?:TagState
}

interface IAppState {
  windowHeight:number,
  memoWidth:number
}

class App extends React.Component<IApp, IAppState> {
  private initialized:boolean = false;

  constructor(props) {
    super(props);

    this.state = {
      windowHeight: 20,
      memoWidth: 0
    }
  }

  componentDidMount() {
    $(window).resize(this.resize.bind(this));
    this.resize();
  }

  resize(e = null) {
    let $window = $(window);
    let $tagList = $('#tagList');
    let $titleList = $('#titleList');
    let $memo = $('#memo');
    this.setState({
      windowHeight: $window.height(),
      memoWidth: $window.width() - $tagList.width() - $titleList.width()
    })
  }

  render() {
    // injected by connect
    const {
      dispatch,
      memo,
      titles,
      tags,
      memoState,
      tagState
      } = this.props;
    const {
      windowHeight,
      memoWidth
      } = this.state;

    Mixin.dispatchAction = dispatch;
    Mixin.RouterClass = Router;
    Router.dispatch = dispatch;

    AppState.tag = tagState;
    AppState.memo = memoState;

    if (!this.initialized) {
      this.initialized = true;
      window.addEventListener('popstate', (e)=> Router.goHere(false));
      Router.goHere();
    }

    return <article className="reader-container">
      <section className="selector-container" style={{height: windowHeight}}>
        <div className="wrapper">
          <TagList tags={tags} tagState={tagState} height={windowHeight}/>
          <TitleList titles={titles} memo={memo} memoState={memoState} height={windowHeight}/>
        </div>
      </section>
      <Memo memo={memo} memoState={memoState} height={windowHeight} width={memoWidth}/>
    </article>
  }
}


function select(state) {
  return {
    memo: state.memo,
    titles: state.titles,
    tags: state.tag,
    memoState: state.memoState,
    tagState: state.tagState,
  }
}

export default connect(select)(App)
