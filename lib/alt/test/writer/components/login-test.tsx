/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import Login from "../src/components/login";
import {LoginState} from '../src/constants/status'

function setup() {

  let props = {
    loginState: LoginState.Request
  };

  let rendered = TestUtils.renderIntoDocument(<Login {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll}
}
