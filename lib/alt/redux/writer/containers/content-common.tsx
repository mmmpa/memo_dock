import * as React from 'react'
import { Link } from 'react-router';
import {LoginState} from '../constants/status'

import mix from '../lib/mix'

export default class ContentCommon<P, S> extends React.Component<P, S> {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.createIndexLink = this.createIndexLink.bind(this);
    this.createNewMemoLink = this.createNewMemoLink.bind(this);
  }

  componentWillMount() {
    const {loginState} = this.props.state;
    const {memoAction,pushState} = this.props;

    if (loginState !== LoginState.LoggedIn) {
      memoAction.checkLogin(null, ()=> {
        pushState(null, '/w');
      });
      return;
    }
  }

  requireLogin() {
    this.props.pushState(null, '/w');
  }

  logOut() {
    this.props.loginAction.logOut(()=> this.props.pushState(null, '/w'));
  }

  createIndexLink(children) {
    return <Link to="/w/memos/">{children}</Link>
  }

  createNewMemoLink(children) {
    return <Link to="/w/memos/new">{children}</Link>
  }
}

export class CommonContainer {
  props:any;

  initializeCommonListener(register){
    register('link:index', ()=> this._rac_linkIndex());
    register('link:newMemo', ()=> this._rac_linkNewMemo());
    register('logOut', ()=> this._rac_logOut());
  }

  checkLogin() {
    if (this._rac_isLoggedIn()) {
      return true;
    }
    this._rac_inquireLogin(null, ()=> {
      this._rac_requireLogin();
    });
    return false;
  }

  _rac_linkIndex() {
    this.props.pushState(null, '/w/memos/');
  }

  _rac_linkNewMemo() {
    this.props.pushState(null, '/w/memos/new');
  }

  _rac_logOut() {
    this.props.loginAction.logOut(()=> this.props.pushState(null, '/w'));
  }

  _rac_isLoggedIn() {
    const {loginState} = this.props.state;
    return loginState === LoginState.LoggedIn;
  }

  _rac_inquireLogin(succeed:Function, fail:Function) {
    this.props.memoAction.checkLogin(succeed, fail);
  }

  _rac_requireLogin() {
    this.props.pushState(null, '/w');
  }
}

export function mixCommon(target) {
  mix(target, [CommonContainer]);
}
