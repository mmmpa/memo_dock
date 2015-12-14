/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import Memo from '../models/memo'
import MemoIndexData from "../models/memo-index-data";

function memoIndexData(state:MemoIndexData = null, action) {
  switch (action.type) {
    case Type.Memo.Index:
      let {memos, page, par, total} = action;
      let ms:Memo[] = _.map(memos, (memo)=> new Memo(memo));
      return new MemoIndexData(ms, page, par, total);
    default:
      return state;
  }
}

export default {memoIndexData}
