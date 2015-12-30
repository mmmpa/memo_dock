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

describe('MemoComponent', () => {
  it('with no memo', ()=> {
    const { dom, find } = setup();

    assert.equal(dom.innerHTML, 'loading...');
    assert.equal(find('.memo.content'), null);
  });

  context(('with memo'), ()=> {
    it('with no tag', ()=> {
      let memo:MemoData = new MemoData({title: 'test1', html: '<h1>test title 1</h1>'});
      const { find } = setup(memo);

      let html = find('.memo.content');
      assert.ok(html);
      assert.equal(html.innerHTML, memo.html);
    });

    it('with tags', (done)=> {
      let memo:MemoData = new MemoData({
        title: 'test1',
        html: '<h1>test title 1</h1>',
        tags: [
          {id: 1, name: 'tag'},
          {id: 2, name: 'tag'}
        ]
      });
      const { find, findAll } = setup(memo,(tagId)=>{
        assert.equal(tagId, 1);
        done();
      });

      let html = find('.memo.content');
      assert.equal(html.innerHTML, memo.html);

      let tags = findAll('.memo.tag a');
      assert.equal(tags.length, 2);

      let tag = tags[0];
      TestUtils.Simulate.click(tag);
    });
  });
});