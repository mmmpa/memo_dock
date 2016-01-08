/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoIndex from "../src/components/memo-index";
import MemoIndexData from "../src/models/memo-index-data";
import {MemoIndexState} from '../src/constants/status'

function setup(memoIndexData = new MemoIndexData([], {}), memoIndexState = MemoIndexState.Ready) {

  let props = {memoIndexData, memoIndexState};

  let rendered = TestUtils.renderIntoDocument(<MemoIndex {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll, rendered}
}

describe('MemoIndex',()=>{
  describe('index memos', ()=>{
    it('with memos', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([
        {id:1, title:'memo1'},
        {id:2, title:'memo1'}
      ],{}));

      assert.equal(findAll('.memo-index.index-table tbody tr').length, 2);
    });

    it('with no memos', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([],{}));

      assert.equal(findAll('.memo-index.index-table tbody tr').length, 0);
    });
  });

  describe('is enable', ()=>{
    it('enable', ()=>{
      let {dom, find, findAll, rendered} = setup(undefined, MemoIndexState.Ready);
      assert.equal(rendered.isEnable(), true);
    });

    it('disable', ()=>{
      let {dom, find, findAll, rendered} = setup(undefined, MemoIndexState.Wait);
      assert.equal(rendered.isEnable(), false);
    });
  });
});
