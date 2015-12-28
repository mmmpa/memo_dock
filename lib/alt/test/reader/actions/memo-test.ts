/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import * as assert from 'power-assert';
import * as MemoAction from '../src/actions/memo';
import MemoData from "../src/models/memo-data";
import * as Type from '../src/constants/action-types';
import * as nock from 'nock'

describe("MemoAction", ()=> {
  before(()=> {
    nock('http://localhost')
      .get('/r/api/memos/1')
      .reply(200, {
        id: 1,
        title: 'title',
        html: '123ABC'
      });

    nock('http://localhost')
      .get('/r/api/memos/0')
      .reply(404);

    nock('http://localhost')
      .get('/r/api/memos')
      .reply(200, [
        {id: 1, title: 'title1'},
        {id: 2, title: 'title2'},
        {id: 3, title: 'title3'},
      ]);

    nock('http://localhost')
      .get('/r/api/memos?tag_ids=2')
      .reply(200, [
        {id: 1, title: 'title1'},
        {id: 2, title: 'title2'},
      ]);

    nock('http://localhost')
      .get('/r/api/memos?tag_ids=1%2C2')
      .reply(200, [
        {id: 1, title: 'title1'}
      ]);

    nock('http://localhost')
      .get('/r/api/memos?tag_ids=500')
      .reply(500);
  });

  describe("show", ()=> {
    it("show return a function", ()=> {
      assert.equal(_.isFunction(MemoAction.show(1)), true);
    });

    context('execute show function', ()=> {
      context('with valid id', ()=> {
        it('convert json to MemoData', (done)=> {
          MemoAction.show(1)((action)=> {
            let {memo} = action;
            assert.equal(memo.id, 1);
            done();
          });
        });
      });

      context('with invalid id', ()=> {
        it('404 MemoData', (done)=> {
          MemoAction.show(0)((action)=> {
            let {memo} = action;
            assert.equal(memo.title, '404');
            done();
          });
        });
      });
    });

    it("showMemoData return an object", ()=> {
      let memo:MemoData = new MemoData();
      assert.deepEqual(MemoAction.showMemoData(memo), {type: Type.MEMO_SHOW, memo});
    });
  });

  describe('remove', ()=> {
    it("remove return an object", ()=> {
      assert.deepEqual(MemoAction.remove(), {type: Type.MEMO_REMOVE});
    });
  });

  describe('index', ()=> {
    it("index return a function", ()=> {
      assert.equal(_.isFunction(MemoAction.index()), true);
    });

    context('execute index function', ()=> {
      context('with no tags', ()=>{
        it('get all memos', (done)=>{
          MemoAction.index()((action)=>{
            assert.equal(action.memos.length, 3);
            done();
          });
        });
      });

      context('with tag', ()=>{
        it('get 2 memos', (done)=>{
          MemoAction.index([2])((action)=>{
            assert.equal(action.memos.length, 2);
            done();
          });
        });

        it('get a memo', (done)=>{
          MemoAction.index([1,2])((action)=>{
            assert.equal(action.memos.length, 1);
            done();
          });
        });
      });

      context('with error', ()=>{
        it('error message', (done)=>{
          MemoAction.index([500])((action)=>{
            assert.equal(action.memos[0].title, 'error');
            done();
          });
        });
      })
    })
  })
});

