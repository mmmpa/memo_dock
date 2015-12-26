import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"
import {LoginState} from '../constants/status'

import LoginPage from "../components/login";


interface ILogin {
  state?:any,
  memoAction?:any,
  loginAction?:any,
  pushState?:Function
}

class Login extends React.Component<ILogin, {}> {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.props.loginAction.checkInitialState();
    this.checkLogin(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLogin(nextProps);
  }

  checkLogin(props) {
    const {loginState} = props.state;
    const {pushState} = props;

    if (loginState === LoginState.LoggedIn) {
      pushState(null, '/w/memos/');
    }
  }

  login(email:string, password:string) {
    this.props.loginAction.login(email, password);
  }

  render() {
    const {loginState} = this.props.state;
    const {login} = this;

    return <LoginPage {...{login, loginState}} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    memoAction: Redux.bindActionCreators(MemoAction, dispatch),
    loginAction: Redux.bindActionCreators(LoginAction, dispatch),
    pushState: Redux.bindActionCreators(pushState, dispatch)
  };
}

function mapStateToProps(state) {
  return {state}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)