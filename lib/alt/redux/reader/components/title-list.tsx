import * as React from 'react'

import {MemoState} from '../constants/status'
import MemoData from "../models/memo-data";

import Fa from '../lib/components/fa'

interface ITitleList {
  titles:MemoData[],
  memo:MemoData,
  memoState:MemoState,
  height:number,
  works:any
}

export default class TitleList extends React.Component<ITitleList,{}> {

  isActiveList(id:number){
    return this.props.memo.id == id
  }

  detectActiveClass(id:number){
    return this.isActiveList(id) ? 'title-list title display-now' : 'title-list title';
  }

  detectIcon(id:number){
    return this.isActiveList(id) ? null : <Fa icon='chevron-right'/>;
  }

  writeTitleList() {
    let {titles, works} =  this.props;

    return titles.map((memo:MemoData)=> {
      return <li key={'memo' + memo.id} className={this.detectActiveClass(memo.id)}>
        <div className="chevron">{this.detectIcon(memo.id)}</div>
        <a onClick={()=> works.memo.show(memo.id)}>{memo.title}</a>
      </li>
    });
  }

  render() {
    let {height} = this.props;

    return <section id="titleList" style={{minHeight: height}} className="title-list title-list-container">
      <ul className="title-list list">
        {this.writeTitleList()}
      </ul>
    </section>
  }
}