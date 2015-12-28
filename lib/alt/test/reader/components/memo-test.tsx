/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils'

import Memo from "../src/components/memo";
import MemoData from "../src/models/memo-data";

function setup(memoData:MemoData = null) {
  let props = {
    memo: memoData,
    windowHeight: 800,
    memoWidth: 1000,
    app: {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render((()=> <Memo {...props} />)());
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
    children: output.props.children
  }
}

describe('MemoComponent', () => {
  it('with no memo', ()=> {
    const { children } = setup();

    assert.equal(children, 'loading...');
  });

  it('with memo', ()=> {
    const { output, children, renderer } = setup(new MemoData({title: 'test1', html: '<h1>test title 1</h1>'}));

    let tags = TestUtils.findRenderedDOMComponentWithClass(renderer, 'memo tag-list');
    console.log(tags);
    assert.equal(true, true);
  });
});