import * as React from 'react'
import * as _ from 'lodash'
import MemoIndexData from "../models/memo-index-data";
import {MemoMix} from "../mixins";

interface IMemoIndexPager {
  memoIndexData:MemoIndexData
}


export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  render() {
    let {memos, page, par, total} = this.props.memoIndexData;
    return <ul className="memo-index pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not') }
             onClick={()=> MemoMix.pageIndex(now) }
             disabled={ memos.length === 0 ? true : false }
          >{now}</a>
        </li>
        })}
    </ul>
  }
}
