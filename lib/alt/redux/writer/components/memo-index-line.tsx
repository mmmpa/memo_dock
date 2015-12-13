import * as React from 'react'
import { Component, PropTypes } from 'react'
import Memo from "../models/memo";

interface IMemoIndexLine {
  key:number,
  memo: Memo
}

export default class MemoIndexLine extends Component<IMemoIndexLine, {}> {
  render() {
    let {memo} = this.props;
    return <tr>
      <td>{memo.title}</td>
      <td>{memo.tags.join(':')}</td>
      <td>{memo.isPublic}</td>
    </tr>
  }
}
