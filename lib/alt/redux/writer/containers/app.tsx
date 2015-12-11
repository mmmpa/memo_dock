/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
const RaisedButton = require('material-ui/lib/raised-button');

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <RaisedButton label="Default" />
      </div>
    )
  }
}

function select(state) {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(select)(App)