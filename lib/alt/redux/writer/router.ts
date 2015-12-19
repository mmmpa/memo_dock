import Router from './lib/router';
import * as MemoAction from './actions/memo'
import {MemoMix} from "./mixins";

export default class WriterRouter {
  static dispatch:Function;
  static router:Router = new Router();


  static initialize() {
    // メモ一覧を取得
    this.router.add('/w/memos',
      (params) => this.go('/w/tags/-/memos/1'));
    // メモの内容を取得
    this.router.add('/w/memos/new',
      (params) => this.dispatch(MemoAction.goEditNewMemo()));
    this.router.add('/w/memos/:memoId',
      (params) => this.dispatch(MemoAction.goEditMemoById(params['memoId'])));
    this.router.add('/w/tags/:tagIds/memos/:pageNum',
      (params) => this.dispatch(MemoAction.loadMemoIndex(params['tagIds'], params['pageNum'])));
  }

  static go(url:string, recoarding:boolean = true):any {
    if (recoarding) {
      history.pushState({}, null, url);
    }
    return this.router.execute(url);
  }

  static goHere(recoarding:boolean = true):any {
    return this.go(WriterRouter.strippedPath(), recoarding);
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }
}