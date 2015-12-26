import * as React from 'react'
import * as _ from 'lodash'
import MemoIndexData from "../models/memo-index-data";
import {AppState, MemoIndexState} from '../constants/status'
import Fa from '../lib/components/fa'

interface IMemoIndexPager {
  memoIndexData:MemoIndexData,
  isEnable:Function,
  app:any
}

export default class MemoIndexPager extends React.Component<IMemoIndexPager, {}> {
  tagRemover(){
    let {app} = this.props;
    let {isSelectedTag} = this.props.memoIndexData;

    let classString = isSelectedTag() ? "memo-index pager-container" : "memo-index pager-container hidden";

    return <li className={classString}>
      <a className="memo-index tag-remover" onClick={()=> app.indexMemo(1, []) }>
        <Fa icon="times"/>
        タグ解除
      </a>
    </li>
  }

  render() {
    let {isEnable, app} = this.props;
    let {page, total} = this.props.memoIndexData;
    return <ul className="memo-index memo-pager">
      {_.times(total, (n:number)=>{
        let now = n + 1;
        return <li className="memo-index pager-container" key={"pager" + now}>
          <a className={"memo-index pager-link " + (now == page ? 'now' : 'not-now') }
             onClick={()=> app.indexMemo(now) }
             disabled={ !isEnable() }
          >{now}</a>
        </li>
        })}
      {this.tagRemover()}
    </ul>
  }
}
