/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoIndexPager from "../src/components/memo-index-pager";
import MemoIndexData from "../src/models/memo-index-data";

function setup(memoIndexData = new MemoIndexData([],{}), isEnable = true) {

  let props = {memoIndexData, isEnable};

  let rendered = TestUtils.renderIntoDocument(<MemoIndexPager {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll, rendered}
}

describe('MemoIndexPager',()=>{
  describe('page anchor', ()=>{
    it('1 page', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([], {'page':1, 'total-pages': 1}));
      let pagers = findAll('.memo-index.pager-link');
      assert.equal(pagers.length, 1);
      assert.equal(pagers[0], find('.memo-index.pager-link.now'));
    });

    it('2 pages, now 1', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([], {'page':1, 'total-pages': 2}));
      let pagers = findAll('.memo-index.pager-link');
      assert.equal(pagers.length, 2);
      assert.equal(pagers[0], find('.memo-index.pager-link.now'));
    });

    it('2 pages, now 2', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([], {'page':2, 'total-pages': 2}));
      let pagers = findAll('.memo-index.pager-link');
      assert.equal(pagers.length, 2);
      assert.equal(pagers[1], find('.memo-index.pager-link.now'));
    });
  });

  describe('tag remover', ()=>{
    it('with no tags', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([], {}));
      assert.ok(find('.hidden .tag-remover'));
    });

    it('with tags', ()=>{
      let {dom, find, findAll} = setup(new MemoIndexData([], {'tag-ids': '1'}));
      assert.ok(!find('.hidden .tag-remover'));
    });
  });

  describe('dispatches', ()=>{
    it('paging 1', (done)=>{
      let {dom, find, findAll, rendered} = setup(new MemoIndexData([], {'page':2, 'total-pages': 2}));
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'index:page');
        assert.deepEqual(page, 1);
        done();
      };

      TestUtils.Simulate.click(findAll('.memo-index.pager-link')[0]);
    });

    it('paging 2', (done)=>{
      let {dom, find, findAll, rendered} = setup(new MemoIndexData([], {'page':2, 'total-pages': 2}));
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'index:page');
        assert.deepEqual(page, 2);
        done();
      };

      TestUtils.Simulate.click(findAll('.memo-index.pager-link')[1]);
    });

    it('tag reset', (done)=>{
      let {dom, find, findAll, rendered} = setup(new MemoIndexData([], {'tag-ids': '1'}));
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'index:reset');
        done();
      };
      TestUtils.Simulate.click(find('.tag-remover'));
    });
  });
});