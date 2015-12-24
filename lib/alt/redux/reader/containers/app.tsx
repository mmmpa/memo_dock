/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import Router from "../router";
import {AppState, TagState, MemoState} from '../constants/status'

import TagList from "../components/tag-list";
import TitleList from "../components/title-list";
import Memo from "../components/memo";
import * as MemoAction from "../actions/memo"
import * as TagAction from "../actions/tag"

import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {} from "../mixins";

require("zepto/zepto.min");
let $ = window.$;

Router.initialize();

interface IApp {
  state?:any,
  works?:any
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
    let $selectorContainer = $('#selectorContainer');
    this.setState({
      windowHeight: $window.height(),
      memoWidth: $window.width() - $selectorContainer.width()
    })
  }

  render() {
    console.log(this.props);
    // injected by connect
    const {
      memo,
      titles,
      tags,
      memoState,
      tagState,
      selectedTagIds,
      } = this.props.state;
    const {works} = this.props;
    const {
      windowHeight,
      memoWidth
      } = this.state;

    AppState.tag = tagState;
    AppState.memo = memoState;

    if (!this.initialized) {
      this.initialized = true;
      window.addEventListener('popstate', (e)=> Router.goHere(false));
      Router.goHere();
    }

    return <article className="reader-container">
      <section id="selectorContainer" className="selector-container" style={{height: windowHeight}}>
        <div className="wrapper">
          <TagList tags={tags} tagState={tagState} selectedTagIds={selectedTagIds} height={windowHeight} works={works}/>
          <TitleList titles={titles} memo={memo} memoState={memoState} height={windowHeight} works={works}/>
        </div>
      </section>
      <Memo memo={memo} memoState={memoState} height={windowHeight} width={memoWidth} works={works}/>
    </article>
  }
}

function mapDispatchToProps(dispatch) {
  Router.dispatch = dispatch;
  return {
    works: {
      memo: Redux.bindActionCreators(MemoAction, dispatch),
      tag: Redux.bindActionCreators(TagAction, dispatch)
    }
  }
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
