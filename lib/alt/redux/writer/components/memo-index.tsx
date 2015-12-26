/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import * as React from 'react'
import {MemoIndexState} from '../constants/status'

import MemoIndexData from "../models/memo-index-data";
import MemoData from "../models/memo-data";

import MemoIndexLine from "./memo-index-line";
import MemoIndexPager from "./memo-index-pager";
import Fa from '../lib/components/fa'

interface IMemoIndex {
  memoIndexData:MemoIndexData,
  memoIndexState:MemoIndexState,
  app:any
}

export default class MemoIndex extends React.Component<IMemoIndex, {}> {
  constructor(props) {
    super(props);

    this.isEnable = this.isEnable.bind(this);
  }

  isEnable():boolean{
    return this.props.memoIndexState === MemoIndexState.Ready
  }

  memoLines() {
    let {memos} = this.props.memoIndexData;
    let {app} = this.props;
    let isEnable = this.isEnable
    return memos.map((memoData)=> <MemoIndexLine
      key={memoData.id}
      {...{memoData, isEnable, app}}
    />)
  }

  loading(memos:MemoData[] = []) {
    if (!memos || memos.length === 0) {
      return <Fa icon="spinner" animation="pulse"/>
    } else {
      return null;
    }
  }

  render() {
    let {memoIndexData, app} = this.props;
    let isEnable = this.isEnable;

    return (
      <div>
        <section className="memo-index index-container">
          <h1 className="memo-index index-title">メモ一覧</h1>
          <MemoIndexPager {...{app, memoIndexData, isEnable}}/>
          <table className="memo-index index-table">
            <thead>
              <tr>
                <th className="title">タイトル</th>
                <th className="tags">タグ</th>
                <th className="public">公開</th>
                <th className="delete"> </th>
              </tr>
            </thead>
            <tbody>
              {this.memoLines()}
            </tbody>
          </table>
          <MemoIndexPager {...{app, memoIndexData, isEnable}}/>
        </section>
      </div>
    )
  }
}
