/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoIndexTagLink from "../src/components/memo-index-tag-link";
import TagData from "../src/models/tag-data";

function setup(tagData = new TagData({id:1, name: 'tag'}), isEnable = true) {

  let props = {
    key: 1,
    isEnable,
    tagData
  };

  let rendered = TestUtils.renderIntoDocument(<MemoIndexTagLink {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll, rendered}
}

describe('MemoIndexTagLink', ()=>{
  describe('render', ()=>{
    it('when is enable', ()=>{
      let {dom, find, findAll} = setup();
      assert.ok(!find('.memo-index.tag-link.disabled'))
    });

    it('when is not enable', ()=>{
      let {dom, find, findAll} = setup(undefined, false);
      assert.ok(find('.memo-index.tag-link.disabled'))
    });
  });

  describe('dispatches', ()=>{
    it('tag', (done)=>{
      let {dom, find, findAll, rendered} = setup();
      rendered.dispatch = (e, ids)=>{
        assert.equal(e, 'index:tag');
        assert.deepEqual(ids, [1]);
        done();
      };
      let anchor = find('a');
      TestUtils.Simulate.click(anchor);
    });
  });
});