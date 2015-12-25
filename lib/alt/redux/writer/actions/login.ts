/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
const request = require('superagent');

export function token():string {
  return document.getElementsByName('csrf-token')[0].getAttribute('content');
}


function displayForm(){
  return {type: Type.Login.DisplayForm};
}

export function requestLogin(afterLoginUri:string = null) {
  return {type: Type.Login.Request, afterLoginUri};
}

export function logout(){
  return (dispatch) => {
    request
      .delete('/w/api/sessions')
      .set('X-CSRF-Token', token())
      .end((err, res)=> {
        if (err) {
        } else {
        }
      })
  }
}

export function logoutFinish() {
  return {type: Type.Login.LoggedOut};
}

export function start(){
  return (dispatch) => {
    dispatch(displayForm());
    dispatch(requestLogin('/w/memos'));
  }
}

export function checkInitialState(succeed:Function = null, fail:Function = null){
  return (dispatch) => {
    request
      .get('/w/api/sessions')
      .end((err, res)=> {
        if (err) {
          dispatch(setRequest());
          fail && fail();
        } else {
          dispatch(setLoggedIn());
          succeed && succeed();
        }
      })
  }
}

function setRequest(){
  return {type: Type.Login.Request};
}

function setLoggedIn(){
  return {type: Type.Login.LoggedIn};
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
          dispatch(setLoggedIn());
          succeed && succeed();
        }
      })
  }
}

export function waitLogin() {
  return {type: Type.Login.Wait};
}

export function requestRetryLogin() {
  return {type: Type.Login.RequestRetry};
}

