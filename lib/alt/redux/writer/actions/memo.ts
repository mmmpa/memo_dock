/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
const request = require('superagent');

export function getIndex(page:number = 1) {
  return (dispatch) => {
    request
      .get('/w/api/memos')
      .set({page})
      .end((err, res)=> {
        if (err) {
          //dispatch(requestLogin());
        } else {
          dispatch(gotIndex(res.body, +res.header.page, +res.header.par, +res.header['total-pages']));
        }
      })
  }
}

function gotIndex(memos:any[], page:number, par:number, total:number) {
  return {type: Type.Memo.Index, memos, page, par, total};
}