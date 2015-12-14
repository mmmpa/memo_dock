import Tag from "./models/tag";
import Memo from "./models/memo";
import * as React from 'react'
import WriterRouter from "./router";
import * as LoginAction from './actions/login'

export default class Mixin {
  static dispatch:Function;
  static router:WriterRouter;
}

export class LoginMix {
  static login(email, password) {
    Mixin.dispatch(LoginAction.tryLogin(email, password, ()=> WriterRouter.goHere()));
  }
}

export class MemoMix {
  static selectTag(tag:Tag) {
    console.log(Mixin.dispatch);
    console.log(tag);
  }

  static editMemo(memo:Memo) {
    console.log(memo);
  }
}