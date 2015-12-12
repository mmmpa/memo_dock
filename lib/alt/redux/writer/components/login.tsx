import * as React from 'react'
import { Component, PropTypes } from 'react'
import * as Mui from 'material-ui'
import * as Status from '../constants/status'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  changePassword(e) {
    this.setState({password: e.target.value});
  }

  changeEmail(e) {
    this.setState({email: e.target.value});
  }

  detectMessage():string{
    switch(this.props.loginState){
      case Status.Login.Invalid:
        return 'Invalid. Please retry.';
      default:
        return '';
    }
  }

  detectButton(){
    switch(this.props.loginState){
      case Status.Login.Wait:
        return <Mui.RaisedButton className="login submit" label="Wait" disabled={true}/>;
      default:
        return <Mui.RaisedButton className="login submit" label="Login" primary={true} onClick={this.login.bind(this)}/>;
    }
  }

  login(e) {
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <article className="login container">
        <h1 className="login title">Login</h1>
        <section className="login input-area">
          <Mui.TextField
            className="login input"
            hintText="you@example.com"
            floatingLabelText="Email address"
            value={this.state.email}
            onChange={this.changeEmail.bind(this)}
          />
        </section>
        <section className="login input-area">
          <Mui.TextField
            className="login input"
            hintText=""
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.changePassword.bind(this)}
          />
        </section>
        <section className="login submit-area">
          {this.detectButton()}
        </section>
        <p className="login state">{this.detectMessage()}</p>
      </article>
    )
  }
}

Login.propTypes = {};
