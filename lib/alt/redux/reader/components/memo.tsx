import * as React from 'react'
import {MemoState} from '../constants/status'
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import Fa from '../lib/components/fa'

interface IMemo {
  memo:MemoData,
  windowHeight:number,
  memoWidth:number,
  app:any
}

export default class Memo extends React.Component<IMemo,{}> {
  componentDidUpdate() {
    let {app} = this.props;
    if (this.props.memo.html === '') {
      let portal = app.getPortal();
      this.props.memo.title = portal.title;
      this.props.memo.html = portal.html;
    }
    app.setTitle(this.props.memo.title);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  writeTagList() {
    return this.props.memo.tags.map((tagData:TagData)=> {
      return <li className="memo tag" key={'memoTag' + tagData.id}>
        <Fa icon="tag"/>
        {this.props.app.createTagLink(tagData.id, tagData.name)}
      </li>
    })
  }

  render() {
    let {windowHeight, memoWidth, memo} = this.props;

    return <section id="memo" style={{height: windowHeight, width: memoWidth}} className="memo memo-container">
      <header className="memo header">
        <h1 className="memo memo-title">{memo.title}</h1>
        <section className="memo tags">
          <ul className="memo tag-list">
            {this.writeTagList()}
          </ul>
        </section>
      </header>
      <div dangerouslySetInnerHTML={{__html: memo.html}}/>
    </section>
  }
}