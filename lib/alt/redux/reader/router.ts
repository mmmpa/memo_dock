import AppRouter from './lib/app-router'
import * as MemoAction from './actions/memo'
import * as TagAction from './actions/tag'
import {MemoWork} from "./mixins";

export default class Router extends AppRouter {
  static initialize() {
    this.router.add('/memo/:memoId',
      (params) => {
        this.dispatch(MemoAction.show(+params['memoId']));
        this.dispatch(MemoAction.index(params['tagIds']));
        this.dispatch(TagAction.index(params['tagIds']));
      });
    this.router.add('/',
      (params) => {
        this.dispatch(MemoAction.remove());
        this.dispatch(MemoAction.index(params['tagIds']));
        this.dispatch(TagAction.index(params['tagIds']));
      });
    this.router.add('',
      (params) => {
        this.dispatch(MemoAction.remove());
        this.dispatch(MemoAction.index());
        this.dispatch(TagAction.index(params['tagIds']));
      });
  }
}