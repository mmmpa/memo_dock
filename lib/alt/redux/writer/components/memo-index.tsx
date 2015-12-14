/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import Memo from "../models/memo";
import * as _ from 'lodash'
import MemoIndexLine from "./memo-index-line";
import MemoIndexPager from "./memo-index-pager";
import {MemoIndexData} from "../models/memo-index-data";

interface IMemoIndex {
  memoIndexData: MemoIndexData
}

export default class MemoIndex extends React.Component<IMemoIndex, {}> {
  constructor(props) {
    super(props);
  }

  memoLines(memos:Memo[] = []) {
    return memos.map((memo)=> <MemoIndexLine key={memo.id} memo={memo}/>)
  }

  render() {
    if(!this.props.memoIndexData){
      return <div>...loading</div>
    }
    let {memos} = this.props.memoIndexData;
    return (
      <article className="memo-index container">
        <h1>メモインデックス</h1>
        <MemoIndexPager memoIndexData={this.props.memoIndexData}/>
        <table className="memo-index index-table">
          <thead>
            <tr>
              <th className="title">タイトル</th>
              <th className="tags">タグ</th>
              <th className="public">公開</th>
            </tr>
          </thead>
          <tbody>
            {this.memoLines(memos)}
          </tbody>
        </table>
      </article>
    )
  }
}
