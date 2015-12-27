/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import MemoData from '../models/memo-data'
import MemoIndexData from "../models/memo-index-data";
import {EditMemoState, MemoIndexState} from '../constants/status';

function memoIndexData(state:MemoIndexData = null, action) {
  switch (action.type) {
    case Type.MEMO_SHOW_INDEX:
      let {memos, page, par, total, tagIds} = action;
      let ms:MemoData[] = _.map(memos, (memo)=> new MemoData(memo));
      return new MemoIndexData(ms, page, par, total, tagIds);
    default:
      return state;
  }
}

function memoIndexState(state:MemoIndexState = MemoIndexState.Wait, action) {
  switch (action.type) {
    case Type.MEMO_SHOW_INDEX:
      return MemoIndexState.Ready;
    case Type.MEMO_WAIT_INDEX:
      return MemoIndexState.Wait;
    default:
      return state;
  }
}

function memoData(state = null, action) {
  switch (action.type) {
    case Type.MEMO_EDIT_NEW_MEMO:
      return action.memo;
    case Type.MEMO_WAIT_EDITING:
      return state;
    case Type.MEMO_START_EDITING:
      return action.memo;
    case Type.MEMO_SUCCEED_SAVING:
      return action.memo;
    default:
      return state;
  }
}

function memoMessage(state:any = null, action) {
  switch (action.type) {
    case Type.MEMO_START_EDITING:
      return null;
    case Type.MEMO_WAIT_EDITING:
      return null;
    case Type.MEMO_START_SAVING:
      return null;
    case Type.MEMO_SUCCEED_SAVING:
      return {messages: {memo: 'Saved'}};
    case Type.MEMO_FAIL_SAVING:
      return {errors: action.errors};
    default:
      return state;
  }
}

function rendered(state:string = '', action) {
  switch (action.type) {
    case Type.MEMO_WAIT_EDITING:
      return '';
    case Type.MEMO_START_EDITING:
      return '';
    case Type.MEMO_FINISH_RENDERING:
      return action.html;
    default:
      return state;
  }
}

function editState(state:EditMemoState = EditMemoState.Ready, action) {
  switch (action.type) {
    case Type.MEMO_WAIT_EDITING:
      return EditMemoState.Loading;
    case Type.MEMO_EDIT_NEW_MEMO:
      return EditMemoState.Ready;
    case Type.MEMO_START_EDITING:
      return EditMemoState.Ready;
    case Type.MEMO_START_SAVING:
      return EditMemoState.Saving;
    case Type.MEMO_SUCCEED_SAVING:
      return EditMemoState.Ready;
    case Type.MEMO_FAIL_SAVING:
      return EditMemoState.Ready;
    default:
      return state;
  }
}

export default {memoIndexData, memoData, rendered, editState, memoMessage, memoIndexState}

