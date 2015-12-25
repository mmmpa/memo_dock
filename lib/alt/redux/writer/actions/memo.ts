/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";
import {token} from "./login"
import Dispatch = Redux.Dispatch;
import Router from "../router";
const request = require('superagent');

//　メモ関係画面遷移

function displayEditor() {
  return {type: Type.Memo.DisplayEditor};
}

function displayIndex() {
  return {type: Type.Memo.DisplayIndex};
}

// メモインデックス取得関係

export function loadMemoIndex(tag_ids:string = '', page:number = 1) {
  //    this.go('/w/memos' + this.buildQueryString({pageNum, tagIds}));

  return (dispatch) => {
    dispatch(displayIndex());
    dispatch(waitLoadedIndex());
    request
      .get('/w/api/memos')
      .query({page, tag_ids})
      .end((err, res)=> {
        if (err) {
          console.log(err);
          //dispatch(requestLogin());
        } else {
          dispatch(loadMemoIndexSuccess(res.body, +res.header.page, +res.header.par, +res.header['total-pages'], res.header['tag-ids']));
        }
      })
  }
}

export function loadTaggedIndex(tag:TagData) {
  return loadMemoIndex(tag.id.toString());
}


function loadMemoIndexSuccess(memos:any[], page:number, par:number, total:number, tagIds:string) {
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
  return (dispatch)=>{
    dispatch(tryDeleteMemo(memo, ()=> Router.goHere()));
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
    dispatch(displayEditor());
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
  return (dispatch) => {
    dispatch(displayEditor());
    dispatch(injectMemoData(new MemoData()));
  }
}

function injectMemoData(memo:MemoData = null) {
  return {type: Type.Memo.StartEditing, memo};
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
