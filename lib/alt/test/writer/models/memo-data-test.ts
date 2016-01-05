/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import MemoData from '../src/models/memo-data';

describe('MemoData', ()=> {
  describe('create', ()=>{
    context('with valid json', ()=> {
      it('got a memo', ()=> {
        let memo = new MemoData({
          id: 1,
          title: 'title',
          src: 'a src',
          public: true,
          tags: [
            {id: 1, name: 'tag1'},
            {id: 2, name: 'tag2'}
          ]
        });

        assert.ok(memo);
        assert.equal(memo.id, 1);
        assert.equal(memo.title, 'title');
        assert.equal(memo.src, 'a src');
        assert.equal(memo.isPublic, true);
        assert.equal(memo.tags.length, 2);
        assert.equal(memo.tagList, 'tag1, tag2');
      });
    });

    context('with lacked json', ()=> {
      it('got blank memo', ()=> {
        let memo = new MemoData({});

        assert.ok(memo);
        assert.equal(memo.id, 0);
      });
    });

    context('with no json', ()=> {
      it('got blank memo', ()=> {
        let memo = new MemoData();

        assert.ok(memo);
        assert.equal(memo.id, 0);
      });
    });
  });

  describe('check persisted', ()=>{
    it('has id is persisted', ()=> {
      let memo = new MemoData({id: 1});

      assert.ok(memo.isPersisted());
    });

    it('id is 0 is not persisted', ()=> {
      let memo = new MemoData({});

      assert.ok(!memo.isPersisted());
    });
  });

  describe('generate params for backend', ()=>{
    let memoParams = new MemoData({
      id: 1,
      title: 'title',
      src: 'a src',
      public: true,
      tags: [
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'}
      ]
    }).generateParams();

    assert.deepEqual(memoParams,{
      id: 1,
      title: 'title',
      src: 'a src',
      "public": true,
      tag_list: 'tag1, tag2'
    })
  })
});

