import * as React from 'react'
import { Link } from 'react-router';
import {LoginState} from '../constants/status'

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