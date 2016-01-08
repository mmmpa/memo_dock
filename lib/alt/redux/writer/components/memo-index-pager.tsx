import * as React from 'react'
import * as _ from 'lodash'
import MemoIndexData from "../models/memo-index-data";
import {AppState, MemoIndexState} from '../constants/status'
import Fa from '../lib/components/fa'

import {mixChild} from "../lib/components/eventer";

interface IMemoIndexPager {
  memoIndexData:MemoIndexData,
  isEnable:boolean
}

export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  dispatch:(event: string, ...args: any[])=> boolean;

  index(page:number){
    this.dispatch('index:page', page);
  }

  reset(){
    this.dispatch('index:reset');
  }

  tagRemover(){
    let {isSelectedTag} = this.props.memoIndexData;

    let classString = isSelectedTag() ? "memo-index pager-container" : "memo-index pager-container hidden";

    return <li className={classString}>
      <a className="memo-index tag-remover" onClick={()=> this.reset() }>
        <Fa icon="times"/>
        タグ解除
      </a>
    </li>
  }

  render() {
    let {isEnable} = this.props;
    let {page, total} = this.props.memoIndexData;
    return <ul className="memo-index memo-pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not-now') }
             onClick={()=> this.index(now) }
             disabled={ !isEnable }
          >{now}</a>
        </li>
        })}
      {this.tagRemover()}
    </ul>
  }
}

mixChild(MemoIndexPager);