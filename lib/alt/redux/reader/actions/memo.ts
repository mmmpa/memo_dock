import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
const request = require('superagent');
import * as TagAction from "./tag"

export function show(memoId:number) {
  return (dispatch) => {
    request
      .get('/r/api/memos/' + memoId)
      .end((err, res)=> {
        if (err) {
          dispatch(showMemoData(new MemoData({})));
        } else {
          dispatch(showMemoData(new MemoData(res.body)));
        }
      })
  }
}

export function showMemoData(memo:MemoData){
  return {type: Type.MEMO_SHOW, memo};
}

export function remove() {
  return {type: Type.MEMO_REMOVE};
}

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    let tagIds:string = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
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
          dispatch(indexSupport(memos));
        }
      })
  }
}

function indexSupport(memos:MemoData[] = []) {
  return {type: Type.MEMO_INDEX, memos};
}