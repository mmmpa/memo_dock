//
// 表示する画面を決定するstate
//

/// <reference path="../types/tsd.d.ts" />

import * as Type from '../action-types'
import * as Context from '../contexts'
import * as _ from 'lodash'

function context(state:string = Context.APP_LOGIN, action):string {
  switch (action.type) {
    case Type.REQUEST_LOGIN:
      return Context.APP_LOGIN;
    case Type.LOGOUT:
      return Context.APP_LOGIN;
    case Type.LOGIN:
      console.log('index')
      return Context.MEMO_INDEX;
    case Type.MEMO_CREATION:
      return Context.MEMO_EDIT;
    case Type.MEMO_EDIT:
      return Context.MEMO_EDIT;
    case Type.MEMO_INDEX:
      return Context.MEMO_INDEX;
    default:
      return state;
  }
}

export default {context}

