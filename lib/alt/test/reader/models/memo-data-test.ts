/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import MemoData from '../src/models/memo-data';

describe('MemoData', ()=>{
  context('with plain object',()=>{
    it('with no tag', ()=>{
      let memo = new MemoData({id: 1, title: 'title', html: '<h1>html</h1>'});
      assert.equal(memo.id, 1);
      assert.equal(memo.title, 'title');
      assert.equal(memo.html, '<h1>html</h1>');
      assert.deepEqual(memo.tags, []);
    });

    it('with tags', ()=>{
      let memo = new MemoData({id: 1, title: 'title', html: '<h1>html</h1>',
      tags: [
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'}
      ]});
      assert.equal(memo.id, 1);
      assert.equal(memo.title, 'title');
      assert.equal(memo.html, '<h1>html</h1>');
      assert.deepEqual(memo.tags.map((t)=> t.id), [1, 2]);
      assert.equal(memo.tagList, 'tag1, tag2');
    });
  });
});