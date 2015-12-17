import Router from './lib/router';
import * as MemoAction from './actions/memo'
import {MemoMix} from "./mixins";

export default class WriterRouter {
  static dispatch:Function;
  static router:Router = new Router();

  static initialize() {
    // メモ一覧を取得
    this.router.add('/w/memos', (params) => MemoMix.loadMemoIndex());
    // メモの内容を取得
    this.router.add('/w/memos/:memoId', (params) => MemoMix.goMemoEditById(params['memoId']));
  }

  static go(url:string):any {
    return this.router.execute(url);
  }

  static goHere():any {
    return this.go(WriterRouter.strippedPath());
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }
}