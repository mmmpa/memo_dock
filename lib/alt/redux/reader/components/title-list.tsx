import * as React from 'react'

import {MemoState} from '../constants/status'
import MemoData from "../models/memo-data";

interface ITitleList {
  titles:MemoData[],
  memo:MemoData,
  memoState:MemoState,
  height:number
}

export default class TitleList extends React.Component<ITitleList,{}> {

  detectActiveClass(id:number){
    return this.props.memo.id == id ? 'title-list title display-now' : 'title-list title';
  }

  writeTitleList() {
    let {titles} =  this.props;

    return titles.map((memo:MemoData)=> {
      return <li key={'memo' + memo.id} className={this.detectActiveClass(memo.id)}>
        <a onClick={()=> console.log(memo.id)}>{memo.title}</a>
      </li>
    });
  }

  render() {
    let {height} = this.props;

    return <section id="titleList" style={{height}} className="title-list title-list-container">
      <ul className="title-list list">
        {this.writeTitleList()}
      </ul>
    </section>
  }
}