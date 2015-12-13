/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import Memo from "../models/memo";
import * as _ from 'lodash'
import MemoIndexLine from "./memo-index-line";

interface IMemoIndex {
  memos: Memo[]
}

export default class MemoIndex extends Component<IMemoIndex, {}> {
  constructor(props) {
    super(props);
  }

  memoLines(memos:Memo[] = []) {
    return memos.map((memo)=> <MemoIndexLine key={memo.id} memo={memo}/>)
  }

  render() {
    return (
      <article>
        <h1>メモインデックス</h1>
        <table className="memo-index index-table">
          <thead>
            <tr>
              <th>タイトル</th>
              <th>タグ</th>
              <th>公開</th>
            </tr>
          </thead>
          <tbody>
            {this.props.memos.map((memo)=> <MemoIndexLine key={memo.id} memo={memo}/>)}
          </tbody>
        </table>
      </article>
    )
  }
}
