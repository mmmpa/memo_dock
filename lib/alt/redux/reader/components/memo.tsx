import * as React from 'react'
import {MemoState} from '../constants/status'
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import Fa from '../lib/components/fa'
import {TagWork, MemoWork} from "../mixins";

interface IMemo {
  memo:MemoData,
  memoState:MemoState,
  height:number,
  width:number
}

export default class Memo extends React.Component<IMemo,{}> {
  componentDidUpdate() {
    if(this.props.memo.html === ''){
      let portal = MemoWork.getPortal();
      this.props.memo.title = portal.title;
      this.props.memo.html = portal.html;
    }
    MemoWork.setTitle(this.props.memo.title);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  writeTagList() {
    return this.props.memo.tags.map((tagData:TagData)=> {
      return <li className="memo tag" key={'memoTag' + tagData.id}>
        <Fa icon="tag"/>
        <a onClick={()=>TagWork.index([tagData.id])}>{tagData.name}</a>
      </li>
    })
  }

  render() {
    let {height, width, memo} = this.props;

    return <section id="memo" style={{height, width}} className="memo memo-container">
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