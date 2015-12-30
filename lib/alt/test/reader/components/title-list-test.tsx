/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import TitleList from "../src/components/title-list";
import MemoData from "../src/models/memo-data";

function setup(
  titles:MemoData[] = [],
  memoData:MemoData = null,
  linkMemo:Function = ()=> null
) {
  let app = {
    linkMemo: linkMemo
  };

  let props = {
    titles: titles,
    memo: memoData,
    windowHeight: 800,
    app
  };

  let rendered = TestUtils.renderIntoDocument(<TitleList {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(dom.querySelectorAll(selector));

  return {dom, find, findAll}
}

describe('MemoComponent', () => {
  describe('display', ()=> {
    it('with no titles', ()=> {
      const { dom, find, findAll } = setup();

      assert.equal(find('.title-list.list li'), null);
    });

    context('with titles', ()=> {
      it('with no memo', ()=> {
        const { dom, find, findAll } = setup([
          new MemoData({id: 1, title: 'title1'}),
          new MemoData({id: 2, title: 'title2'})
        ]);

        assert.equal(findAll('.title-list.list li').length, 2);
        assert.equal(find('.title-list.list .display-now'), null);
      });

      it('with selected memo', ()=> {
        const { dom, find, findAll } = setup([
          new MemoData({id: 1, title: 'title1'}),
          new MemoData({id: 2, title: 'title2'})
        ], new MemoData({id: 1}));

        assert.equal(findAll('.title-list.list li').length, 2);
        assert.equal(find('.title-list.list .display-now a').innerHTML, 'title1');
      });

      it('when select memo', (done)=> {
        const { dom, find, findAll } = setup([
          new MemoData({id: 1, title: 'title1'}),
          new MemoData({id: 2, title: 'title2'})
        ], new MemoData({id: 1}),
          (memoId)=>{
            assert.equal(memoId, 2);
            done();
          });

        assert.equal(findAll('.title-list.list li').length, 2);
        assert.equal(find('.title-list.list .display-now a').innerHTML, 'title1');

        let title = findAll('.title-list.list li a')[1];
        TestUtils.Simulate.click(title);
      });
    });
  });
});