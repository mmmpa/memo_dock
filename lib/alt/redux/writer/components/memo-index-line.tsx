import * as React from 'react'
import Memo from "../models/memo";
import Tag from "../models/tag";
import MemoIndexTagLink from "./memo-index-tag-link";
import {MemoMix} from "../mixins";

interface IMemoIndexLine {
  key:number,
  memo: Memo
}

export default class MemoIndexLine extends React.Component<IMemoIndexLine, {}>  {
  tagLinks(tags:Tag[] = []) {
    return tags.map((tag)=> <MemoIndexTagLink key={tag.id} tag={tag}/>)
  }

  detectPublicText() {
    return this.props.memo.isPublic ? '公開' : '下書き';
  }

  render() {
    let {memo} = this.props;
    return <tr>
      <td className="title">
        <a onClick={()=> MemoMix.editMemo(memo)}>{memo.title}</a>
      </td>
      <td className="tags">{this.tagLinks(memo.tags)}</td>
      <td className="public">{this.detectPublicText()}</td>
    </tr>
  }
}
