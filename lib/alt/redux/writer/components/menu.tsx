import * as React from 'react'
import { Component, PropTypes } from 'react'
import {LoginWork, MemoWork} from "../mixins";
import Fa from '../lib/components/fa'

interface IMenu {
  index:Function,
  create:Function,
  logOut:Function
}

export default class Menu extends Component<IMenu,{}> {
  render() {
    let {createIndexLink, createNewMemoLink, logOut} = this.props;
    return (
      <article className="global-menu">
        <nav className="global-menu menu-container">
          <ul className="global-menu menu-list">
            <li>
              <Fa icon="list"/>
              {createIndexLink('メモ一覧')}
            </li>
            <li>
              <Fa icon="pencil"/>
              {createNewMemoLink('新規メモ')}
            </li>
            <li>
              <Fa icon="remove"/>
              <a onClick={()=> logOut()}>
                ログアウト
              </a>
            </li>
          </ul>
        </nav>
      </article>
    )
  }
}
