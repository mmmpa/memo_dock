import * as _ from 'lodash'
import * as React from 'react'

import * as TagAction from './actions/tag'
import * as MemoAction from './actions/memo'
import Router from "./router";

import TagData from "./models/tag-data";
import MemoData from "./models/memo-data";

export default class WorkBase {
  static dispatchAction:Function;
  static RouterClass:any;

  static dispatch(action:any) {
    WorkBase.dispatchAction(action);
  }

  static go(uri:string){
    WorkBase.RouterClass.go(uri);
  }

  static Router(){
    return WorkBase.RouterClass
  }

  static buildQueryString(hash:any):string {
    let result:string[] = [];
    _.pairs(hash).map((kv)=> {
      if (kv[1]) {
        result.push(kv.join('='))
      }
    });
    if (!result.length) {
      return '';
    }
    return '?' + result.join('&');
  }
}

export class TagWork extends WorkBase {
  static logout(){
    this.dispatch(TagAction.index());
  }
}

export class MemoWork extends WorkBase {
  static show(memoId:number) {

  }

  static index(tagIds:string) {

  }
}