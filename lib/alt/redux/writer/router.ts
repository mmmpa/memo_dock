import Router from './lib/router';
import * as MemoAction from './actions/memo'

export default class WriterRouter {
  static dispatch:Function;
  static router:Router = new Router();

  static initialize() {
    // メモ一覧を取得
    this.router.add('/w/memos', (params) => this.dispatch(MemoAction.getIndex()));
    // メモの内容を取得
    this.router.add('/w/memos/:memoId', (params) => this.dispatch(MemoAction.editMemoById(params['memoId'])));
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