import * as React from 'react'

import MemoData from "../models/memo-data";

import Fa from '../lib/components/fa'

interface ITitleList {
  titles:MemoData[],
  memo:MemoData,
  windowHeight:number,
  app:any
}

export default class TitleList extends React.Component<ITitleList,{}> {

  isActiveList(id:number) {
    let {memo} = this.props;
    if (!memo) {
      return false
    }
    return memo.id == id
  }

  detectActiveClass(id:number) {
    return this.isActiveList(id) ? 'title-list title display-now' : 'title-list title';
  }

  detectIcon(id:number) {
    return this.isActiveList(id) ? null : <Fa icon='chevron-right'/>;
  }

  writeTitleList() {
    let {titles, app} =  this.props;

    return titles.map((memo:MemoData)=> {
      return <li key={'memo' + memo.id} className={this.detectActiveClass(memo.id)}>
        <div className="chevron">{this.detectIcon(memo.id)}</div>
        <a onClick={()=> app.linkMemo(memo.id)}>{memo.title}</a>
      </li>
    });
  }

  render() {
    let {windowHeight} = this.props;

    return <section id="titleList" style={{minHeight: windowHeight}} className="title-list title-list-container">
      <ul className="title-list list">
        {this.writeTitleList()}
      </ul>
    </section>
  }
}