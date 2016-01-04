import * as React from 'react'
import Fa from '../lib/components/fa'
import {mixChild} from "../components/eventer";

export default class Menu extends React.Component<{},{}> {
  dispatch:Function;

  render() {
    return (
      <article className="global-menu">
        <nav className="global-menu menu-container">
          <ul className="global-menu menu-list">
            <li>
              <Fa icon="list"/>
              <a onClick={()=> this.dispatch('link:index')}>メモ一覧</a>
            </li>
            <li>
              <Fa icon="pencil"/>
              <a onClick={()=> this.dispatch('link:newMemo')}>新規メモ</a>
            </li>
            <li>
              <Fa icon="remove"/>
              <a onClick={()=> this.dispatch('logOut')}>ログアウト</a>
            </li>
          </ul>
        </nav>
      </article>
    )
  }
}

mixChild(Menu);
