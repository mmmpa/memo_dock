/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import Memo from '../models/memo'
import MemoIndexData from "../models/memo-index-data";
import {EditMemoState} from '../constants/status';

function memoIndexData(state:MemoIndexData = new MemoIndexData(), action) {
  switch (action.type) {
    case Type.Memo.ShowIndex:
      let {memos, page, par, total, tagIds} = action;
      let ms:Memo[] = _.map(memos, (memo)=> new Memo(memo));
      return new MemoIndexData(ms, page, par, total, tagIds);
    case Type.Memo.WaitIndex:
      if (!state) {
        return state;
      }
      let newData:MemoIndexData = state.clone();
      newData.memos = [];
      return newData;
    default:
      return state;
  }
}

function memoData(state = new Memo(), action) {
  switch (action.type) {
    case Type.Memo.WaitEditing:
      return new Memo();
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

export default {memoIndexData, memoData, rendered, editState, memoMessage}

