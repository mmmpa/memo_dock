import * as React from 'react'
import * as _ from 'lodash'
import {MemoWork} from "../mixins";
import MemoIndexData from "../models/memo-index-data";
import {AppState, MemoIndexState} from '../constants/status'
import Fa from '../lib/components/fa'

interface IMemoIndexPager {
  memoIndexData:MemoIndexData
}

export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  isEnable():boolean{
    return AppState.index === MemoIndexState.Ready
  }

  tagRemover(){
    if(!this.isEnable() || !this.props.memoIndexData.isSelectedTag()){
      return null;
    }

    return <li className="memo-index pager-container">
      <a className="memo-index tag-remover" onClick={()=> MemoWork.loadMemoIndex() }>
        <Fa icon="times"/>
        タグ解除
      </a>
    </li>
  }

  render() {
    let {memos, page, par, total, tagIds} = this.props.memoIndexData;
    return <ul className="memo-index memo-pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not-now') }
             onClick={()=> MemoWork.loadMemoIndex(now, tagIds) }
             disabled={ !this.isEnable() }
          >{now}</a>
        </li>
        })}
      {this.tagRemover()}
    </ul>
  }
}
