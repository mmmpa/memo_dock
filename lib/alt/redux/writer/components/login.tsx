import * as React from 'react'
import { Component, PropTypes } from 'react'
import RaisedButton = require('material-ui/lib/raised-button');

export default class Login extends Component {
  render() {
    console.log(this.props)
    return (
      <article>
        <h1>ログインページ</h1>
        <RaisedButton label="Primary" primary={true} onTouchTap={this.props.login} />
      </article>
    )
  }
}

Login.propTypes = {};
