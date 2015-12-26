/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {token, checkInitialState} from "./login"
import Dispatch = Redux.Dispatch;
import MemoData from "../models/memo-data";
const request = require('superagent');

export function checkLogin(...args) {
  return checkInitialState(...args);
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

        } else {
          dispatch(showIndex(res.body, +res.header.page, +res.header.par, +res.header['total-pages'], res.header['tag-ids']));
        }
      })
  }
}

export function loadTaggedIndex(tag:TagData) {
  return index(tag.id.toString());
}


function showIndex(memos:any[], page:number, par:number, total:number, tagIds:string) {
  return {type: Type.Memo.ShowIndex, memos, page, par, total, tagIds};
}

function waitLoadedIndex() {
  return {type: Type.Memo.WaitIndex};
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
  return {type: Type.Memo.StartSaving};
}

function saveMemoFail(errors:any) {
  return {type: Type.Memo.FailSaving, errors};
}

function saveMemoSucceed(memo:MemoData) {
  return {type: Type.Memo.SucceedSaving, memo};
}

export function deleteMemo(memo:MemoData) {
  return (dispatch)=> {
    dispatch(tryDeleteMemo(memo, ()=> null));
  }
}

export function tryDeleteMemo(memo:MemoData, callback:Function) {
  return (dispatch) => {
    dispatch(waitLoadedIndex());
    request
      .delete('/w/api/memos/' + memo.id)
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

function waitLoadedMemo() {
  return {type: Type.Memo.WaitEditing};
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


export function editNewMemo() {
  let memo:MemoData = new MemoData();
  return {type: Type.Memo.StartEditing, memo};
}

function injectMemoData(memo:MemoData = null) {
  return {type: Type.Memo.EditNewMemo, memo};
}

export function startEditMemo(memo:MemoData) {
  return editMemoById(memo.id);
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
  return {type: Type.Memo.FinishRendering, html};
}
