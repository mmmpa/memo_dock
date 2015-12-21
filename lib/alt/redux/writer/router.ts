import AppRouter from './lib/app-router'
import * as MemoAction from './actions/memo'
import * as LoginAction from './actions/login'
import {MemoWork} from "./mixins";

export default class Router extends AppRouter {
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
}