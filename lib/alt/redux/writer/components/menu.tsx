import * as React from 'react'
import { Component, PropTypes } from 'react'
import {MemoMix} from "../mixins";

export default class Menu extends Component<{},{}> {
  render() {
    return (
      <article className="global-menu">
        <nav className="global-menu menu-container">
          <ul className="global-menu menu-list">
            <li>
              <a onClick={()=> MemoMix.goMemoIndex()}>メモ一覧</a>
            </li>
            <li>
              <a onClick={()=> MemoMix.goNewMemo()}>新規メモ</a>
            </li>
          </ul>
        </nav>
      </article>
    )
  }
}
