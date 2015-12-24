import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
const request = require('superagent');
import Router from "../router";
import * as TagAction from "./tag"

export function show(memoId:number) {
  return (dispatch) => {
    Router.go('/memo/' + memoId + Router.pickQueryString(), true, false);
    request
      .get('/r/api/memos/' + memoId)
      .end((err, res)=> {
        if (err) {
          console.log(err)
        } else {
          dispatch(showSucceed(new MemoData(res.body)));
        }
      })
  }
}

function showSucceed(memo:MemoData){
  return {type: Type.MEMO_SHOW, memo};
}

export function remove() {
  return {type: Type.MEMO_REMOVE};
}

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    let tagIds:string = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
    Router.go(Router.pickPath() + Router.buildQueryString({tagIds}), true, false);

    request
      .get('/r/api/memos')
      .query({tag_ids: tagIds})
      .end((err, res)=> {
        if (err) {
          console.log(err)
        } else {
          let memos = res.body.map((memo)=> {
            return new MemoData(memo);
          });
          dispatch(indexSucceed(memos));
        }
      })
  }
}

function indexSucceed(memos:MemoData[] = []) {
  return {type: Type.MEMO_INDEX, memos};
}