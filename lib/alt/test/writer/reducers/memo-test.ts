/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import MemoReducer from '../src/reducers/memo';
import MemoData from "../src/models/memo-data";
import MemoIndexData from "../src/models/memo-index-data";
import * as Type from '../src/constants/action-types';
import {EditMemoState, MemoIndexState} from '../src/constants/status';

describe('MemoReducer', ()=> {
  describe('memoIndexData', ()=> {
    it('default', ()=> {
      assert.equal(MemoReducer.memoIndexData(undefined, {}), null);
    });

    it('show', ()=> {
      let indexData = new MemoIndexData([], {});
      assert.equal(MemoReducer.memoIndexData(undefined, {type: Type.MEMO_SHOW_INDEX, indexData}), indexData);
    });
  });

  describe('memoIndexState', ()=> {
    it('default', ()=> {
      assert.equal(MemoReducer.memoIndexState(undefined, {}), MemoIndexState.Wait);
    });

    it('show', ()=> {
      assert.equal(MemoReducer.memoIndexState(undefined, {type: Type.MEMO_SHOW_INDEX}), MemoIndexState.Ready);
    });

    it('wait', ()=> {
      assert.equal(MemoReducer.memoIndexState(undefined, {type: Type.MEMO_WAIT_INDEX}), MemoIndexState.Wait);
    });

    it('other', ()=>{
      assert.equal(MemoReducer.memoIndexState(MemoIndexState.Wait, {}), MemoIndexState.Wait);
    });
  });

  describe('memoData', ()=> {
    it('default', ()=> {
      let memo = new MemoData();
      assert.equal(MemoReducer.memoData(undefined, {}), null);
    });

    it('edit', ()=> {
      let memo = new MemoData();
      assert.equal(MemoReducer.memoData(undefined, {type: Type.MEMO_EDIT_NEW_MEMO, memo}), memo);
    });

    it('start', ()=> {
      let memo = new MemoData();
      assert.equal(MemoReducer.memoData(undefined, {type: Type.MEMO_START_EDITING, memo}), memo);
    });

    it('save', ()=> {
      let memo = new MemoData();
      assert.equal(MemoReducer.memoData(undefined, {type: Type.MEMO_SUCCEED_SAVING, memo}), memo);
    });
  });

  describe('editState', ()=> {
    it('default', ()=> {
      assert.equal(MemoReducer.editState(undefined, {}), EditMemoState.Ready);
    });

    it('wait', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_WAIT_EDITING}), EditMemoState.Loading);
    });

    it('new', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_EDIT_NEW_MEMO}), EditMemoState.Ready);
    });

    it('start', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_START_EDITING}), EditMemoState.Ready);
    });

    it('save', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_START_SAVING}), EditMemoState.Saving);
    });

    it('saved', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_SUCCEED_SAVING}), EditMemoState.Ready);
    });

    it('fail', ()=> {
      assert.equal(MemoReducer.editState(undefined, {type: Type.MEMO_FAIL_SAVING}), EditMemoState.Ready);
    });

    it('other', ()=> {
      assert.equal(MemoReducer.editState(EditMemoState.Loading, {}), EditMemoState.Loading);
    });
  });

  describe('memoMessage', ()=> {
    it('default', ()=> {
      assert.equal(MemoReducer.memoMessage(undefined, {}), null);
    });

    it('reset', ()=> {
      assert.equal(MemoReducer.memoMessage({}, {type: Type.MEMO_START_EDITING}), null);
    });

    it('reset', ()=> {
      assert.equal(MemoReducer.memoMessage({}, {type: Type.MEMO_WAIT_EDITING}), null);
    });

    it('reset', ()=> {
      assert.equal(MemoReducer.memoMessage({}, {type: Type.MEMO_START_SAVING}), null);
    });

    it('succeed', ()=> {
      assert.deepEqual(MemoReducer.memoMessage({}, {type: Type.MEMO_SUCCEED_SAVING}), {messages: {memo: 'Saved'}});
    });

    it('fail', ()=> {
      assert.deepEqual(MemoReducer.memoMessage('a', {type: Type.MEMO_FAIL_SAVING, errors: 'errors'}), {errors: 'errors'});
    });

    it('other', ()=> {
      assert.equal(MemoReducer.memoMessage('a', {}), 'a');
    });
  });


  describe('rendered', ()=> {
    it('default', ()=> {
      assert.equal(MemoReducer.rendered(undefined, {}), '');
    });

    it('init', ()=> {
      assert.equal(MemoReducer.rendered('a', {type: Type.MEMO_WAIT_EDITING}), '');
    });

    it('init', ()=> {
      assert.equal(MemoReducer.rendered('a', {type: Type.MEMO_START_EDITING}), '');
    });

    it('rendered', ()=> {
      assert.equal(MemoReducer.rendered('a', {type: Type.MEMO_FINISH_RENDERING, html: 'new'}), 'new');
    });

    it('other', ()=> {
      assert.equal(MemoReducer.rendered('a', {}), 'a');
    });
  });
});
