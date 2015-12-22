import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
const request = require('superagent');

export function show(memoId:number) {
  return (dispatch) => {
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
  return {type: Type.Memo.Show, memo};
}

export function remove() {
  return {type: Type.Memo.Remove};
}

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    let tagIds:string = tagIdNumbers.join(',');
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
  return {type: Type.Memo.Index, memos};
}