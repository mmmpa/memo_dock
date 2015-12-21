import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import {MemoState} from '../constants/status'
import MemoData from '../models/memo-data'

function memo(state:MemoData = new MemoData(), action){
  switch(action.type){
    case Type.Memo.Remove:
      return new MemoData();
    case Type.Memo.Show:
      return action.memo;
    default:
      return state;
  }
}

function titles(state:MemoData[] = [], action){
  switch(action.type){
    case Type.Memo.Index:
      console.log(action)
      return action.memos;
    default:
      return state;
  }
}

function memoState(state:MemoState = MemoState.Ready, action){
  switch(action.type){
    default:
      return state;
  }
}

export default {memo, titles, memoState}