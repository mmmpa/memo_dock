/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import * as React from 'react'
import {MemoWork} from "../mixins";
import {AppState, MemoIndexState} from '../constants/status'

import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";

import MemoIndexLine from "./memo-index-line";

interface IMemoIndexTagLink {
  key:number,
  tagData:TagData
}

export default class MemoIndexTagLink extends React.Component<IMemoIndexTagLink, {}> {
  isEnable():boolean {
    return AppState.index === MemoIndexState.Ready
  }

  detectLinkEnabled():string {
    return this.isEnable() ? 'memo-index tag-link' : 'memo-index tag-link disabled';
  }

  render() {
    let {tagData} = this.props;
    return (
      <div className="memo-index tag-link-container">
        <a className={this.detectLinkEnabled()} onClick={()=> MemoWork.goTaggedIndex(tagData)}>{tagData.name}</a>
      </div>
    )
  }
}
