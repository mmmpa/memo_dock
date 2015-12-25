import * as React from 'react'
import { Component, PropTypes } from 'react'
import {LoginWork, MemoWork} from "../mixins";
import Fa from '../lib/components/fa'

interface IMenu {
  works:any
}

export default class Menu extends Component<IMenu,{}> {
  render() {
    let {memo, login} = this.props.works
    return (
      <article className="global-menu">
        <nav className="global-menu menu-container">
          <ul className="global-menu menu-list">
            <li>
              <Fa icon="list"/>
              <a onClick={()=> memo.loadMemoIndex()}>
                メモ一覧
              </a>
            </li>
            <li>
              <Fa icon="pencil"/>
              <a onClick={()=> memo.editNewMemo()}>
                新規メモ
              </a>
            </li>
            <li>
              <Fa icon="remove"/>
              <a onClick={()=> login.logout()}>
                ログアウト
              </a>
            </li>
          </ul>
        </nav>
      </article>
    )
  }
}
