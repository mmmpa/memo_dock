//
// どの画面を使うかのみを決定する。
//

/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import {Context} from '../constants/status';

function context(state:Context = Context.Calm, action):Context {
  switch (action.type) {
    case Type.Login.DisplayForm:
      return Context.Login;
    case Type.Memo.DisplayEditor:
      return Context.MemoEdit;
    case Type.Memo.DisplayIndex:
      return Context.MemoIndex;
    default:
      return state;
  }
}

export default {context}

