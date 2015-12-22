import AppRouter from './lib/app-router'
import * as MemoAction from './actions/memo'
import * as TagAction from './actions/tag'
import {MemoWork} from "./mixins";

export default class Router extends AppRouter {
  static initialize() {
    this.router.add('/memo/:memoId',
      (params) => {
        let tagIds:number[] = this.split(params['tagIds']);
        this.dispatch(MemoAction.show(+params['memoId']));
        this.dispatch(MemoAction.index(tagIds));
        this.dispatch(TagAction.index(tagIds));
      });
    this.router.add('/',
      (params) => {
        let tagIds:number[] = this.split(params['tagIds']);
        this.dispatch(MemoAction.remove());
        this.dispatch(MemoAction.index(tagIds));
        this.dispatch(TagAction.index(tagIds));
      });
    this.router.add('',
      (params) => {
        let tagIds:number[] = this.split(params['tagIds']);
        this.dispatch(MemoAction.remove());
        this.dispatch(MemoAction.index());
        this.dispatch(TagAction.index(tagIds));
      });
  }

  static split(ids:string):number[] {
    if (!ids) {
      return [];
    }
    ids.split(',').map((n)=> +n);
  }
}