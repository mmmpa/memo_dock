import * as React from 'react'
import * as Status from '../constants/status'
import Fa from '../lib/components/fa'
import {LoginMix} from "../mixins";

interface ILogin {
  loginState: Status.Login
}

interface ILoginState {
  email:string,
  password:string
}

export default class Login extends React.Component<ILogin, ILoginState> {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  changePassword(e) {
    this.setState({email: this.state.email, password: e.target.value});
  }

  changeEmail(e) {
    this.setState({email: e.target.value, password: this.state.password});
  }

  detectMessage():string {
    switch (this.props.loginState) {
      case Status.Login.Invalid:
        return 'Invalid. Please retry.';
      default:
        return '';
    }
  }

  detectButton() {
    switch (this.props.loginState) {
      case Status.Login.Wait:
        return <button type="submit" className="login submit wait" disabled={true}>
          <Fa icon="spinner" animation="pulse"/>
          wait
        </button>;
      default:
        return <button type="submit" className="login submit ready"
                       onClick={this.login.bind(this)}>
          <Fa icon="smile-o"/>
          Login
        </button>;
    }
  }

  login(e) {
    LoginMix.login(this.state.email, this.state.password);
  }

  render() {
    return <article className="login container">
      <header className="login title-area">
        <h1 className="login title">Login</h1>
      </header>
      <section className="login input-area">
        <h1 className="login sub-title">Email Address</h1>
        <input className="login input" type="text" value={this.state.email}
               name="email" onChange={this.changeEmail.bind(this)}/>
      </section>
      <section className="login input-area">
        <h1 className="login sub-title">Password</h1>
        <input className="login input" type="password" value={this.state.password}
               name="password" onChange={this.changePassword.bind(this)}/>
      </section>
      <section className="login submit-area">
        {this.detectButton()}
      </section>
      <p className="login state">{this.detectMessage()}</p>
    </article>;
  }
}
