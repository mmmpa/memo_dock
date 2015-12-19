import * as React from 'react'
import * as _ from 'lodash'
import MemoIndexData from "../models/memo-index-data";
import {MemoMix} from "../mixins";
import Fa from '../lib/components/fa'

interface IMemoIndexPager {
  memoIndexData:MemoIndexData
}


export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  isEnable():boolean{
    return this.props.memoIndexData.memos.length !== 0
  }

  tagRemover(){
    if(this.isEnable() && this.props.memoIndexData.isSelectedTag()){
      return <li className="memo-index pager-container">
        <a className="memo-index tag-remover" onClick={()=> MemoMix.loadMemoIndex() }>
          <Fa icon="times"/>
          タグ解除
        </a>
      </li>
    }
    return null;
  }

  render() {
    let {memos, page, par, total, tagIds} = this.props.memoIndexData;
    return <ul className="memo-index memo-pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not-now') }
             onClick={()=> MemoMix.loadMemoIndex(now, tagIds) }
             disabled={ !this.isEnable() }
          >{now}</a>
        </li>
        })}
      {this.tagRemover()}
    </ul>
  }
}
