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
    this.loadMemoIndex();
  }

  static goNewMemo() {
    WriterRouter.go('/w/memos/new');
  }

  static goMemoEditById(id:number) {
    WriterRouter.go('/w/memos/' + id);
  }

  static goMemoEdit(memo:Memo) {
    this.goMemoEditById(memo.id);
  }

  static loadMemoIndex(page:number = 1) {
    WriterRouter.go('/w/tags/-/memos/' + page);
  }


  static goTaggedIndex(tag:Tag) {
    console.log(Mixin.dispatch);
    console.log(tag);
  }


  static saveMemo(memo:Memo) {
    Mixin.dispatch(MemoAction.saveMemo(memo));
  }

  static renderSlim(slim:string){
    Mixin.dispatch(MemoAction.renderSlim(slim));
  }
}