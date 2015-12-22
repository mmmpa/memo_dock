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

  static go(...args) {
    WorkBase.RouterClass.go(...args);
  }

  static Router() {
    return WorkBase.RouterClass
  }

  static pickPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
  }

  static pickQueryString():string {
    let result = location.href.match(/\?.+/);
    return result ? result[0] : '';
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
  static index(tagIdNumbers:number[]) {
    let tagIds:string = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
    this.go(this.pickPath() + this.buildQueryString({tagIds}), true, false);
    this.dispatch(TagAction.index(tagIdNumbers));
    this.dispatch(MemoAction.index(tagIdNumbers));
  }
}


export class MemoWork extends WorkBase {
  static show(memoId:number) {
    this.go('/memo/' + memoId + this.pickQueryString(), true, false);
    this.dispatch(MemoAction.show(memoId));
  }

  static index(tagIdNumbers:number[]) {
    TagWork.index(tagIdNumbers);
  }
}