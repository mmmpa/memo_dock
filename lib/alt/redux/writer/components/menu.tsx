import * as React from 'react'
import { Component, PropTypes } from 'react'
import {LoginWork, MemoWork} from "../mixins";
import Fa from '../lib/components/fa'

export default class Menu extends Component<{},{}> {
  render() {
    return (
      <article className="global-menu">
        <nav className="global-menu menu-container">
          <ul className="global-menu menu-list">
            <li>
              <Fa icon="list"/>
              <a onClick={()=> MemoWork.goMemoIndex()}>
                メモ一覧
              </a>
            </li>
            <li>
              <Fa icon="pencil"/>
              <a onClick={()=> MemoWork.goNewMemo()}>
                新規メモ
              </a>
            </li>
            <li>
              <Fa icon="remove"/>
              <a onClick={()=> LoginWork.logout()}>
                ログアウト
              </a>
            </li>
          </ul>
        </nav>
      </article>
    )
  }
}
