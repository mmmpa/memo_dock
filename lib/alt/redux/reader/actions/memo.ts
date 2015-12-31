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
          dispatch(showMemoData(new MemoData({title: '404', html: '404'})));
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
    console.log('index')
    let query = (()=>{
      if(tagIdNumbers.length){
        let tag_ids:string = tagIdNumbers.join(',');
        return {tag_ids};
      }else{
        return null;
      }
    })();
    request
      .get('/r/api/memos')
      .query(query)
      .end((err, res)=> {
        if (err) {
          dispatch(indexSupport([new MemoData({title: 'error', id: 0})]));
        } else {
          let memos = res.body.map((memo)=> {
            return new MemoData(memo);
          });
          dispatch(indexSupport(memos));
        }
      })
  }
}

function indexSupport(memos:MemoData[]) {
  return {type: Type.MEMO_INDEX, memos};
}