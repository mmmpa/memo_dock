//
// 表示する画面を決定するstate
//

/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import {Context} from '../constants/status';
import * as _ from 'lodash'

function context(state:Context = Context.Calm, action):Context {
  switch (action.type) {
    case Type.Login.LoggedIn:
      return Context.MemoIndex;
    case Type.Login.Request:
      return Context.Login;
    case Type.Login.LoggedOut:
      return Context.Login;
    case Type.Memo.Index:
      return Context.MemoIndex;
    case Type.Memo.WaitIndex:
      return Context.MemoIndex;
    case Type.Memo.Edit:
      return Context.MemoEdit;
    case Type.Memo.Create:
      return Context.MemoEdit;
    default:
      return state;
  }
}

export default {context}

