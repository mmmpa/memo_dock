/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
const request = require('superagent');

export function getIndex(page:number=1){
  return (dispatch) => {
    request
      .get('/w/api/memos')
      .set({page})
      .end((err, res)=> {
        if (err) {
          //dispatch(requestLogin());
        } else {
          dispatch(gotIndex(res.body));
        }
      })
  }
}

function gotIndex(value:any[]){
  return {type: Type.Memo.Index, value};
}