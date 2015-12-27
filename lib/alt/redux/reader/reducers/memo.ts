import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import MemoData from '../models/memo-data'

function memo(state:MemoData = null, action) {
  switch (action.type) {
    case Type.MEMO_REMOVE:
      return null;
    case Type.MEMO_SHOW:
      return action.memo;
    default:
      return state;
  }
}

function titles(state:MemoData[] = [], action) {
  switch (action.type) {
    case Type.MEMO_INDEX:
      return action.memos;
    default:
      return state;
  }
}

function html(state:HTMLElement = null, action) {
  return state;
}

export default {memo, titles, html}