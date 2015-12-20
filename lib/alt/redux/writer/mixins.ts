import * as _ from 'lodash'
import * as React from 'react'

import * as LoginAction from './actions/login'
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

export class LoginWork extends WorkBase {
  static login(email:string, password:string, afterLoginUri:string) {
    this.dispatch(LoginAction.tryLogin(email, password, ()=> {
      if(afterLoginUri){
        this.Router().go(afterLoginUri);
      }else{
        this.Router().goHere();
      }
    }));
  }

  static checkInitialState(callback:Function){
    this.dispatch(LoginAction.checkInitialState(()=> callback()));
  }

  static logout(){
    this.dispatch(LoginAction.logout());
  }
}

export class MemoWork extends WorkBase {
  static goNewMemo() {
    this.go('/w/memos/new');
  }

  static goMemoEditById(id:number) {
    this.go('/w/memos/' + id);
  }

  static loadMemoIndex(pageNum:number = null, tagIds:string = null) {
    this.go('/w/memos' + this.buildQueryString({pageNum, tagIds}));
  }

  static goTaggedIndex(tag:TagData) {
    this.loadMemoIndex(null, tag.id.toString())
  }

  static goMemoIndex() {
    this.loadMemoIndex();
  }

  static goMemoEdit(memo:MemoData) {
    this.goMemoEditById(memo.id);
  }

  static saveMemo(memo:MemoData) {
    this.dispatch(MemoAction.saveMemo(memo));
  }

  static deleteMemo(memo:MemoData) {
    this.dispatch(MemoAction.deleteMemo(memo, ()=> this.Router().goHere()));
  }


  static renderSlim(slim:string) {
    this.dispatch(MemoAction.renderSlim(slim));
  }
}