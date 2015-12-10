import * as React from 'react'
import { Component, PropTypes } from 'react'
const RaisedButton = require('material-ui/lib/raised-button');

export default class App extends Component {
  render() {
    return (
      <div>
        <RaisedButton label="Default" />
      </div>
    )
  }
}

