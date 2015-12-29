import * as React from 'react'
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import Fa from '../lib/components/fa'
let hljs = window.hljs;

interface IMemo {
  memo:MemoData,
  windowHeight:number,
  memoWidth:number,
  app:any
}

export default class Memo extends React.Component<IMemo,{}> {
  componentDidMount(){
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if(hljs){
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
    }
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

    if (!memo) {
      return <div className="memo now-loading">loading...</div>;
    }

    return <section id="memo" style={{height: windowHeight, width: memoWidth}} className="memo memo-container">
      <header className="memo header">
        <h1 className="memo memo-title">{memo.title}</h1>
        <section className="memo tags">
          <ul className="memo tag-list">
            {this.writeTagList()}
          </ul>
        </section>
      </header>
      <div className="memo content" dangerouslySetInnerHTML={{__html: memo.html}}/>
    </section>
  }
}