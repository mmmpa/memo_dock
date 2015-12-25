import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'

import {LoginState} from '../constants/status'

import Login from "../components/login";

import * as MemoAction from "../actions/memo"
import * as LoginAction from "../actions/login"
import { pushState } from 'redux-router'

interface IApp {
  state?:any,
  memoAction?:any,
  loginAction?:any,
}

class App extends React.Component<IApp, {}> {
  componentDidMount(){
    this.props.loginAction.checkInitialState();
  }

  login(email:string, password:string){
    this.props.loginAction.login(email, password);
  }

  render() {
    console.log(this.props);
    const {
      loginState,
      } = this.props.state;

    const {
      pushState
      } = this.props;

    if (loginState === LoginState.LoggedIn) {
      pushState(null, '/w/memos/');
      return <div>logged in...</div>;
    }

    return <Login
      login={this.login.bind(this)}
      loginState={loginState}
    />;
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
)(App)