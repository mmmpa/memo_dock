/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoEdit from "../src/components/memo-edit";
import MemoData from "../src/models/memo-data";
import {EditMemoState} from '../src/constants/status'

function setup(memoData = new MemoData(), editState = EditMemoState.Ready, rendered = '', memoMessage = {}) {

  let props = {memoData, editState, rendered, memoMessage};

  let rendered = TestUtils.renderIntoDocument(<Login {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {rendered, dom, find, findAll}
}
