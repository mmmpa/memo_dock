/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import MemoData from '../models/memo-data'
import MemoIndexData from "../models/memo-index-data";
import {EditMemoState, MemoIndexState} from '../constants/status';

function memoIndexData(state:MemoIndexData = null, action) {
  switch (action.type) {
    case Type.Memo.ShowIndex:
      let {memos, page, par, total, tagIds} = action;
      let ms:MemoData[] = _.map(memos, (memo)=> new MemoData(memo));
      return new MemoIndexData(ms, page, par, total, tagIds);
    default:
      return state;
  }
}

function memoIndexState(state:MemoIndexState = MemoIndexState.Wait, action) {
  switch (action.type) {
    case Type.Memo.ShowIndex:
      return MemoIndexState.Ready;
    case Type.Memo.WaitIndex:
      return MemoIndexState.Wait;
    default:
      return state;
  }
}


function memoData(state = null, action) {
  switch (action.type) {
    case Type.Memo.EditNewMemo:
      return action.memo;
    case Type.Memo.WaitEditing:
      return state;
    case Type.Memo.StartEditing:
      return action.memo;
    case Type.Memo.SucceedSaving:
      return action.memo;
    default:
      return state;
  }
}

function memoMessage(state:any = null, action) {
  switch (action.type) {
    case Type.Memo.StartEditing:
      return null;
    case Type.Memo.WaitEditing:
      return null;
    case Type.Memo.StartSaving:
      return null;
    case Type.Memo.SucceedSaving:
      return {messages: {memo: 'Saved'}};
    case Type.Memo.FailSaving:
      return {errors: action.errors};
    default:
      return state;
  }
}

function rendered(state:string = '', action) {
  switch (action.type) {
    case Type.Memo.WaitEditing:
      return '';
    case Type.Memo.StartEditing:
      return '';
    case Type.Memo.FinishRendering:
      return action.html;
    default:
      return state;
  }
}

function editState(state:EditMemoState = EditMemoState.Ready, action) {
  switch (action.type) {
    case Type.Memo.WaitEditing:
      return EditMemoState.Loading;
    case Type.Memo.EditNewMemo:
      return EditMemoState.Ready;
    case Type.Memo.StartEditing:
      return EditMemoState.Ready;
    case Type.Memo.StartSaving:
      return EditMemoState.Saving;
    case Type.Memo.SucceedSaving:
      return EditMemoState.Ready;
    case Type.Memo.FailSaving:
      return EditMemoState.Ready;
    default:
      return state;
  }
}

export default {memoIndexData, memoData, rendered, editState, memoMessage, memoIndexState}

