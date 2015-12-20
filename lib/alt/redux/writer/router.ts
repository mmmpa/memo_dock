import RouterBase from './lib/router';
import * as MemoAction from './actions/memo'
import * as LoginAction from './actions/login'
import {MemoWork} from "./mixins";

export default class Router {
  static dispatch:Function;
  static router:RouterBase = new RouterBase();

  static initialize() {
    this.router.add('/w',
      (params) => {
        this.dispatch(LoginAction.start());
      });

    this.router.add('/w/memos',
      (params) => {
        this.dispatch(MemoAction.loadMemoIndex(params['tagIds'], params['pageNum']));
      });
    this.router.add('/w/memos/new',
      (params) => this.dispatch(MemoAction.goEditNewMemo()));
    this.router.add('/w/memos/:memoId',
      (params) => this.dispatch(MemoAction.goEditMemoById(params['memoId'])));
  }


  static go(url:string, isRecord:boolean = true):any {
    if (isRecord) {
      history.pushState({}, null, url);
    }
    return this.router.execute(url);
  }

  static goHere(isRecord:boolean = true):any {
    return this.go(Router.strippedPath(), isRecord);
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }
}