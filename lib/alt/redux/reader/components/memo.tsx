import * as React from 'react'
import * as ReactDOM from 'react-dom'
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
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if(this.refs['container']){
      ReactDOM.findDOMNode(this.refs['container']).scrollTop = 0;
    }

    if (hljs) {
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
    }
  }


  writeTagList() {
    let {app} = this.props;
    return this.props.memo.tags.map((tagData:TagData)=> {
      return <li className="memo tag" key={'memoTag' + tagData.id}>
        <Fa icon="tag"/>
        <a onClick={()=> app.linkTag(tagData.id)}>{tagData.name}</a>
      </li>
    })
  }

  render() {
    let {windowHeight, memoWidth, memo} = this.props;
    if (!memo) {
      return <div className="memo now-loading">loading...</div>;
    }

    return <section id="memo" style={{height: windowHeight, width: memoWidth}} className="memo memo-container" ref="container">
      <header className="memo header">
        <h1 className="memo memo-title">{memo.title}</h1>
        <section className="memo tags">
          <ul className="memo tag-list">
            {this.writeTagList()}
          </ul>
        </section>
        <section className="memo last-update">
          更新: <em className="time">{memo.update}</em>
        </section>
      </header>
      <div className="memo content" dangerouslySetInnerHTML={{__html: memo.html}}/>
    </section>
  }
}