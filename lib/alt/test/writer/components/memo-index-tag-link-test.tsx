/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import Memo from "../src/components/memo";
import MemoData from "../src/models/memo-data";

function setup(memoData:MemoData = null, linkTag:Function = ()=> null) {
  let app = {
    linkTag: linkTag
  };

  let props = {
    memo: memoData,
    windowHeight: 800,
    memoWidth: 1000,
    app
  };

  let rendered = TestUtils.renderIntoDocument(<Memo {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll}
}
