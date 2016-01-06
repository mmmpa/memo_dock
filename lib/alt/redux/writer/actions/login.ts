/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
const request = require('superagent');
const global = require("global");

export function token():string {
  return global.document.getElementsByName('csrf-token')[0].getAttribute('content');
}

export function checkInitialState(succeed:Function = null, fail:Function = null){
  return (dispatch) => {
    request
      .get('/w/api/sessions')
      .end((err, res)=> {
        if (err) {
          dispatch(requestLogin());
          fail && fail();
        } else {
          dispatch(accept());
          succeed && succeed();
        }
      })
  }
}

export function logOut(succeed:Function = null, fail:Function = null){
  return (dispatch) => {
    request
      .delete('/w/api/sessions')
      .set('X-CSRF-Token', token())
      .end((err, res)=> {
        if (err) {
          fail && fail();
        } else {
          dispatch(requestLogin());
          succeed && succeed();
        }
      })
  }
}

function requestLogin(){
  return {type: Type.LOGIN_REQUEST};
}

function accept(){
  return {type: Type.LOGIN_LOGGED_IN};
}

export function login(email:string, password:string, succeed:Function, fail:Function) {
  return (dispatch) => {
    dispatch(waitLogin());
    request
      .post('/w/api/sessions')
      .set('X-CSRF-Token', token())
      .set('Accept', 'application/json')
      .send({writer_session: {email, password}})
      .end((err, res)=> {
        if (err) {
          dispatch(requestRetryLogin());
          fail && fail();
        } else {
          dispatch(accept());
          succeed && succeed();
        }
      })
  }
}

export function waitLogin() {
  return {type: Type.LOGIN_WAIT};
}

export function requestRetryLogin() {
  return {type: Type.LOGIN_REQUEST_RETRY};
}

