/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import * as assert from 'power-assert';
import MemoReducer from '../src/reducers/memo';
import MemoData from "../src/models/memo-data";
import * as Type from '../src/constants/action-types';

describe('MemoReducer', ()=> {
  describe('memo', ()=>{
    it('default', ()=>{
      let state = MemoReducer.memo(undefined, {type: ''});
      assert.equal(state, null);
    });

    it('MEMO_REMOVE', ()=>{
      let state = MemoReducer.memo(new MemoData(), {type: Type.MEMO_REMOVE});
      assert.equal(state, null);
    });

    it('MEMO_SHOW', ()=>{
      let memo:MemoData = new MemoData();
      let state = MemoReducer.memo(undefined, {type: Type.MEMO_SHOW, memo});
      assert.equal(state, memo);
    });

    it('other', ()=>{
      let memo:MemoData = new MemoData();
      let state = MemoReducer.memo(memo, {type: ''});
      assert.equal(state, memo);
    });
  });

  describe('titles', ()=>{
    context('MEMO_INDEX', ()=>{
      it('default', ()=>{
        let state = MemoReducer.titles(undefined, {type: ''});
        assert.deepEqual(state, []);
      });

      it('with empty array', ()=>{
        let memos = [];
        let state = MemoReducer.titles(undefined, {type: Type.MEMO_INDEX, memos});
        assert.equal(state, memos);
      });

      it('with memos', ()=>{
        let memos = [new MemoData()];
        let state = MemoReducer.titles(undefined, {type: Type.MEMO_INDEX, memos});
        assert.equal(state, memos);
      });

      it('other', ()=>{
        let memos = [new MemoData()];
        let state = MemoReducer.titles(memos, {type: ''});
        assert.equal(state, memos);
      });
    });
  });

  describe('html', ()=>{
    it('default', ()=>{
      let state = MemoReducer.html(undefined, {type: ''});
      assert.equal(state, null);
    });

    it('not change', ()=>{
      let state = MemoReducer.html(undefined, {type: ''});
      assert.equal(state, null);
    });
  });
});
