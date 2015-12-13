import * as React from 'react'
import { Component, PropTypes } from 'react'

export default class MemoIndexLine extends Component {
  render() {
    let {memo} = this.props;
    return <tr>
      <td>{memo.title}</td>
      <td>{memo.tags.join(':')}</td>
      <td>{memo.isPublic}</td>
    </tr>
  }
}