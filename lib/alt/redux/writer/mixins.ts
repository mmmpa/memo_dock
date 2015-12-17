import Tag from "./models/tag";
import Memo from "./models/memo";
import * as React from 'react'
import WriterRouter from "./router";
import * as LoginAction from './actions/login'
import * as MemoAction from './actions/memo'

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
  static goMemoIndex() {
    MemoMix.loadMemoIndex();
  }

  static goNewMemo() {
    Mixin.dispatch(MemoAction.goEditNewMemo());
  }

  static goMemoEditById(id:number) {
    Mixin.dispatch(MemoAction.goEditMemoById(id));
  }

  static goMemoEdit(memo:Memo) {
    Mixin.dispatch(MemoAction.goEditMemoById(memo.id));
  }

  static goTaggedIndex(tag:Tag) {
    console.log(Mixin.dispatch);
    console.log(tag);
  }


  static saveMemo(memo:Memo) {
    Mixin.dispatch(MemoAction.saveMemo(memo));
  }

  static loadMemoIndex(page:number = 1) {
    Mixin.dispatch(MemoAction.loadMemoIndex(page));
  }

  static renderSlim(slim:string){
    Mixin.dispatch(MemoAction.renderSlim(slim));
  }
}