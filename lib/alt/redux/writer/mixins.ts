import Tag from "./models/tag";
import Memo from "./models/memo";
import * as React from 'react'
import WriterRouter from "./router";
import * as LoginAction from './actions/login'
import * as MemoAction from './actions/memo'
import * as _ from 'lodash'

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

  static loadMemoIndex(pageNum:number = null, tagIds:string = null) {
    WriterRouter.go('/w/memos' + this.buildQuery({pageNum, tagIds}));
  }

  static buildQuery(hash:any):string {
    let result:string[] = []
    _.pairs(hash).map((kv)=> {
      if (kv[1]) {
        result.push(kv.join('='))
      }
    });
    if (result.length === 0) {
      return '';
    }
    return '?' + result.join('&');
  }

  static goTaggedIndex(tag:Tag) {
    WriterRouter.go('/w/memos?tagIds=' + tag.id);
  }

  static saveMemo(memo:Memo) {
    Mixin.dispatch(MemoAction.saveMemo(memo));
  }

  static renderSlim(slim:string) {
    Mixin.dispatch(MemoAction.renderSlim(slim));
  }
}