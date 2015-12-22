import * as React from 'react'
import {MemoState} from '../constants/status'
import MemoData from "../models/memo-data";

interface IMemo {
  memo:MemoData,
  memoState:MemoState,
  height:number,
  width:number
}

export default class Memo extends React.Component<IMemo,{}> {

  componentDidUpdate(){
    hljs.initHighlighting.called = false
    hljs.initHighlighting()
  }

  render() {
    let {height, width, memo} = this.props;

    return <section id="memo" style={{height, width}} className="memo memo-container">
      <div dangerouslySetInnerHTML={{__html: memo.html}}/>
    </section>
  }
}