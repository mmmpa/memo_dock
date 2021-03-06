/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {token, checkInitialState} from "./login"
import Dispatch = Redux.Dispatch;
import MemoIndexData from "../models/memo-index-data";
const request = require('superagent');

export function checkLogin(succeed:Function = null, fail:Function = null) {
  return checkInitialState(succeed, fail);
}

// メモインデックス取得関係

export function index(tagIdNumbers:number[] = [], page:number = 1) {
  return (dispatch) => {
    let tag_ids:string = tagIdNumbers.length ? tagIdNumbers.join(',') : null;

    dispatch(waitLoadedIndex());
    request
      .get('/w/api/memos')
      .query({page, tag_ids})
      .end((err, res)=> {
        if (err) {
          console.log(err)
          dispatch(failIndexLoad())
        } else {
          dispatch(showIndex(new MemoIndexData(res.body, res.header)));
        }
      })
  }
}

function failIndexLoad() {
  return {type: Type.MEMO_SHOW_INDEX_RETRY};
}

function showIndex(indexData:MemoIndexData) {
  return {type: Type.MEMO_SHOW_INDEX, indexData};
}

function waitLoadedIndex() {
  return {type: Type.MEMO_WAIT_INDEX};
}

// メモ保存関係

export function saveMemo(memo:MemoData) {
  let requester = memo.isPersisted()
    ? request.patch('/w/api/memos/' + memo.id)
    : request.post('/w/api/memos/new');

  return (dispatch) => {
    dispatch(saveMemoStart());
    requester
      .set('X-CSRF-Token', token())
      .send({memo: memo.generateParams()})
      .end((err, res)=> {
        if (err) {
          dispatch(saveMemoFail(res.body));
        } else {
          dispatch(saveMemoSucceed(new MemoData(res.body)));
        }
      })
  }
}

function saveMemoStart() {
  return {type: Type.MEMO_START_SAVING};
}

function saveMemoFail(errors:any) {
  return {type: Type.MEMO_FAIL_SAVING, errors};
}

function saveMemoSucceed(memo:MemoData) {
  return {type: Type.MEMO_SUCCEED_SAVING, memo};
}

export function deleteMemo(memoId:number, callback:Function) {
  return (dispatch) => {
    dispatch(waitLoadedIndex());
    request
      .delete('/w/api/memos/' + memoId)
      .set('X-CSRF-Token', token())
      .end((err, res)=> {
        if (err) {
          callback();
        } else {
          callback();
        }
      })
  }
}

// メモ編集画面

export function editNewMemo() {
  let memo:MemoData = new MemoData();
  return {type: Type.MEMO_START_EDITING, memo};
}

export function editMemoById(memoId:number) {
  return (dispatch) => {
    dispatch(waitLoadedMemo());
    request
      .get('/w/api/memos/' + memoId)
      .end((err, res)=> {
        if (err) {
          dispatch(injectMemoData(new MemoData()));
        } else {
          dispatch(injectMemoData(new MemoData(res.body)));
        }
      })
  }
}

function waitLoadedMemo() {
  return {type: Type.MEMO_WAIT_EDITING};
}

function injectMemoData(memo:MemoData = null) {
  return {type: Type.MEMO_EDIT_NEW_MEMO, memo};
}

// slimのリアルタイムレンダリング

export function renderSlim(slim:string) {
  return (dispatch) => {
    request
      .post('/w/api/memos/slim')
      .set('X-CSRF-Token', token())
      .send({slim})
      .end((err, res)=> {
        if (err) {
          dispatch(renderSlimFinish('書式が不正です'));
        } else {
          dispatch(renderSlimFinish(res.body.html));
        }
      })
  }
}

export function renderSlimFinish(html:string) {
  return {type: Type.MEMO_FINISH_RENDERING, html};
}
