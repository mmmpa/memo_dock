/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import {AppState, TagState, MemoState} from '../constants/status'
import { Link } from 'react-router';
import TagList from "../components/tag-list";
import TitleList from "../components/title-list";
import Memo from "../components/memo";
import * as MemoAction from "../actions/memo"
import * as TagAction from "../actions/tag"
import * as _ from 'lodash'
import {pickQueryString, pickPath, buildQueryString} from '../lib/path-manip'
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {} from "../mixins";
import { pushState } from 'redux-router'

require("zepto/zepto.min");
let $ = window.$;

interface IApp {
  state?:any,
  works?:any,
  html?:HTMLElement,
  params?:any,
  pushState?:any
}

interface IAppState {
  windowHeight:number,
  memoWidth:number,
  memoId?:number,
  tagIds?:number[],
}

class App extends React.Component<IApp, IAppState> {
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

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps, this.props)
  }

  createTagLink(tagIds:number, children:any) {
    let path:string = pickPath() + buildQueryString({tagIds});
    return <Link to={path}>{children}</Link>
  }

  createMemoLink(memoId:number, children:any) {
    let path:string = '/memo/' + memoId + pickQueryString();
    return <Link to={path}>{children}</Link>
  }

  selectTag(tagIdNumbers:number[]) {
    if (tagIdNumbers.length) {
      let tagIds:string = tagIdNumbers.join(',');
      let path:string = pickPath() + buildQueryString({tagIds});
      this.props.pushState(null, path);
    } else {
      let path:string = pickPath();
      this.props.pushState(null, path);
    }
  }

  loadData(props, nowProps = null) {
    let {params, location} = props;

    if (!nowProps || !this.isSameMemoId(props, nowProps)) {
      let memoId:number = +params.memoId;
      props.memoAction.show(memoId);
    }

    if (!nowProps || !this.isSameTagIds(props, nowProps)) {
      let tagIds:number[] = this.normalizeTagIds(location.query.tagIds);
      props.tagAction.index(tagIds);
    }
  }

  isSameMemoId(a, b) {
    return a.params.memoId === b.params.memoId;
  }

  isSameTagIds(a, b) {
    return a.location.query.tagIds === b.location.query.tagIds;
  }

  normalizeTagIds(ids:string):number[] {
    if (!ids) {
      return [];
    }
    return ids.split(',').map((n)=> +n);
  }

  getPortal():MemoData {
    let memo:MemoData = new MemoData();
    var {html} = this.props;
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
    console.log(this.props)

    const {
      memo,
      titles,
      tags,
      memoState,
      tagState,
      selectedTagIds,
      } = this.props.state;
    const {app} = this.props;
    const {
      windowHeight,
      memoWidth
      } = this.state;

    app.getPortal = this.getPortal.bind(this);
    app.createMemoLink = this.createMemoLink.bind(this);
    app.createTagLink = this.createTagLink.bind(this);
    app.selectTag = this.selectTag.bind(this);

    AppState.tag = tagState;
    AppState.memo = memoState;

    return <article className="reader-container">
      <section id="selectorContainer" className="selector-container" style={{height: windowHeight}}>
        <div className="wrapper">
          <TagList
            app={app}
            tags={tags}
            tagState={tagState}
            selectedTagIds={selectedTagIds}
            height={windowHeight}
          />
          <TitleList
            app={app}
            titles={titles}
            memo={memo}
            memoState={memoState}
            height={windowHeight}
          />
        </div>
      </section>
      <Memo
        app={app}
        memo={memo}
        memoState={memoState}
        height={windowHeight}
        width={memoWidth}
      />
    </article>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    memoAction: Redux.bindActionCreators(MemoAction, dispatch),
    tagAction: Redux.bindActionCreators(TagAction, dispatch),
    app: {
      setTitle: (title:string)=> {
        document.title = title;
      },
      getPortal: ():MemoData=> new MemoData()
    },
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
