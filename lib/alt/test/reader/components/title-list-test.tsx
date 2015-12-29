/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import TitleList from "../src/components/title-list";
import MemoData from "../src/models/memo-data";

function setup(titles:MemoData[] = [], memoData:MemoData = null) {
  let app = {
    createMemoLink: ()=> null
  };

  let props = {
    titles: titles
    memo: memoData,
    windowHeight: 800,
    app
  };

  let rendered = TestUtils.renderIntoDocument(<TitleList {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll}
}

describe('MemoComponent', () => {
});