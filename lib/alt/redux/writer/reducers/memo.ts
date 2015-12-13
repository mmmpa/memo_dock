/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import Memo from '../models/memo'

function memos(state:Memo[] = [], action){
  switch (action.type) {
    case Type.Memo.Index:
      return _.map(action.value, (memo)=> new Memo(memo));
    default:
      return state;
  }
}

export default {memos}
