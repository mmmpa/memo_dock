/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import Memo from "../models/memo";
import {token} from "./login"
import Dispatch = Redux.Dispatch;
const request = require('superagent');

//　メモ関係画面遷移

function goMemoEditor(memo:Memo = null) {
  return {type: Type.Memo.StartEditing, memo};
}

function goMemoIndex() {
  return {type: Type.Memo.StartEditing};
}

// メモインデックス取得関係

export function getIndex(){
  return loadMemoIndex();
}

export function loadMemoIndex(page:number = 1) {
  return (dispatch) => {
    dispatch(waitLoadedIndex());
    request
      .get('/w/api/memos')
      .query({page})
      .end((err, res)=> {
        if (err) {
          //dispatch(requestLogin());
        } else {
          dispatch(loadMemoIndexSuccess(res.body, +res.header.page, +res.header.par, +res.header['total-pages']));
        }
      })
  }
}

function loadMemoIndexSuccess(memos:any[], page:number, par:number, total:number) {
  return {type: Type.Memo.ShowIndex, memos, page, par, total};
}

function waitLoadedIndex() {
  return {type: Type.Memo.WaitIndex};
}

// メモ保存関係

export function saveMemo(memo:Memo) {
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
          dispatch(saveMemoSuccess(new Memo(res.body)));
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

function saveMemoSuccess(memo:Memo) {
  return {type: Type.Memo.SuccessSaving, memo};
}

// メモ編集画面

function waitLoadedMemo() {
  return {type: Type.Memo.WaitEditing};
}

export function goEditMemoById(memoId:number) {
  return (dispatch) => {
    dispatch(waitLoadedMemo());
    request
      .get('/w/api/memos/' + memoId)
      .end((err, res)=> {
        if (err) {
          dispatch(goMemoEditor(new Memo()));
        } else {
          dispatch(goMemoEditor(new Memo(res.body)));
        }
      })
  }
}

export function goEditNewMemo() {
  return goMemoEditor(new Memo());
}

export function startEditMemo(memo:Memo) {
  return goEditMemoById(memo.id);
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
