/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import Memo from "../models/memo";
import {token} from "./login"
const request = require('superagent');

export function getIndex(page:number = 1) {
  return (dispatch) => {
    dispatch(waitLoadedIndex());
    request
      .get('/w/api/memos')
      .query({page})
      .end((err, res)=> {
        if (err) {
          //dispatch(requestLogin());
        } else {
          dispatch(gotIndex(res.body, +res.header.page, +res.header.par, +res.header['total-pages']));
        }
      })
  }
}

export function updateMemo(memo:Memo) {
  if(memo.isPersisted()){
    return (dispatch) => {
      request
        .patch('/w/api/memos/' + memo.id)
        .set('X-CSRF-Token', token())
        .send({memo: memo.generateParams()})
        .end((err, res)=> {
          if (err) {
            dispatch(updateMemoFailed(res.body));
          } else {
            console.log(res.body);

            dispatch(updateMemoAfter(new Memo(res.body)));
          }
        })
    }
  }else{
    return (dispatch) => {
      request
        .post('/w/api/memos/new')
        .set('X-CSRF-Token', token())
        .send({memo: memo.generateParams()})
        .end((err, res)=> {
          if (err) {
            dispatch(updateMemoFailed(res.body));
          } else {
            dispatch(updateMemoAfter(new Memo(res.body)));
          }
        })
    }
  }
}

function updateMemoFailed(errors:any) {
  return {type: Type.Memo.FailedCreation, errors};
}

function updateMemoAfter(memo:Memo) {
  return {type: Type.Memo.Created, memo};
}

function waitLoadedIndex() {
  return {type: Type.Memo.WaitIndex};
}

function gotIndex(memos:any[], page:number, par:number, total:number) {
  return {type: Type.Memo.Index, memos, page, par, total};
}

function goEditMemo(memo:Memo = null) {
  return {type: Type.Memo.Edit, memo};
}

function waitLoadedMemo() {
  return {type: Type.Memo.WaitEdit};
}

export function editNewMemo() {
  goEditMemo(new Memo());
}

export function editMemoById(memoId:number) {
  return (dispatch) => {
    dispatch(waitLoadedMemo());
    request
      .get('/w/api/memos/' + memoId)
      .end((err, res)=> {
        if (err) {
          dispatch(goEditMemo(new Memo()));
        } else {
          dispatch(goEditMemo(new Memo(res.body)));
        }
      })
  }
}

export function editMemo(memo:Memo) {
  return editMemoById(memo.id);
}

export function renderSlim(slim:string) {
  return (dispatch) => {
    request
      .post('/w/api/memos/slim')
      .set('X-CSRF-Token', token())
      .send({slim})
      .end((err, res)=> {
        if (err) {
          dispatch(renderedSlim('書式が不正です'));
        } else {
          dispatch(renderedSlim(res.body.html));
        }
      })
  }
}

export function renderedSlim(html:string) {
  return {type: Type.Memo.Rendered, html};
}
