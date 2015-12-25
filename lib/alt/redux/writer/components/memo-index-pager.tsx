import * as React from 'react'
import * as _ from 'lodash'
import MemoIndexData from "../models/memo-index-data";
import {AppState, MemoIndexState} from '../constants/status'
import Fa from '../lib/components/fa'

interface IMemoIndexPager {
  memoIndexData:MemoIndexData,
  isEnable:Function,
  works:any
}

export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  tagRemover(){
    let {works, isEnable} = this.props

    if(!isEnable() || !this.props.memoIndexData.isSelectedTag()){
      return null;
    }

    return <li className="memo-index pager-container">
      <a className="memo-index tag-remover" onClick={()=> works.memo.loadMemoIndex() }>
        <Fa icon="times"/>
        タグ解除
      </a>
    </li>
  }

  render() {
    let {isEnable} = this.props
    let {memos, page, par, total, tagIds} = this.props.memoIndexData;
    return <ul className="memo-index memo-pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not-now') }
             onClick={()=> works.memo.loadMemoIndex(tagIds, now) }
             disabled={ !isEnable() }
          >{now}</a>
        </li>
        })}
      {this.tagRemover()}
    </ul>
  }
}
