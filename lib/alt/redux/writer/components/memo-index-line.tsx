import * as React from 'react'
import {AppState, MemoIndexState} from '../constants/status'

import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";

import MemoIndexTagLink from "./memo-index-tag-link";
import Fa from '../lib/components/fa'

interface IMemoIndexLine {
  key:number,
  memoData: MemoData,
  works:any
}

export default class MemoIndexLine extends React.Component<IMemoIndexLine, {}> {
  isEnable():boolean {
    return AppState.index === MemoIndexState.Ready
  }

  tagLinks(tags:TagData[] = []) {
    let {works} = this.props;
    return tags.map((tagData)=> <MemoIndexTagLink
      key={tagData.id}
      tagData={tagData}
      works={works}
    />)
  }

  detectPublicText() {
    return this.props.memoData.isPublic ? '公開' : '下書き';
  }

  detectLinkEnabled():string {
    return this.isEnable() ? '' : 'disabled';
  }


  render() {
    let {memoData, works} = this.props;
    return <tr>
      <td className="title">
        <a className={this.detectLinkEnabled()} onClick={()=> works.memo.editMemoById(memoData.id)}>{memoData.title}</a>
      </td>
      <td className="tags">{this.tagLinks(memoData.tags)}</td>
      <td className="public">{this.detectPublicText()}</td>
      <td className="delete">
        <button disabled={!this.isEnable()} onClick={()=> works.memo.deleteMemo(memoData)}>
          <Fa icon="trash-o"/>
        </button>
      </td>
    </tr>
  }
}
