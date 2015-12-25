/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
import Router from "../router";
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
          Router.go('/w');
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

export function checkInitialState(callback:Function){
  return (dispatch) => {
    request
      .get('/w/api/sessions')
      .end((err, res)=> {
        if (err) {
          Router.go('/w');
        } else {
          dispatch(loginFinish());
          callback();
        }
      })
  }
}

export function login(email:string, password:string, afterLoginUri:string) {
  return (dispatch)=>{
    dispatch(tryLogin(email, password, ()=> {
      if(afterLoginUri){
        Router.go(afterLoginUri);
      }else{
        Router.goHere();
      }
    }));
  }
}

export function tryLogin(email:string, password:string, callback:Function) {
  return (dispatch) => {
    console.log('try')
    dispatch(waitLogin());
    request
      .post('/w/api/sessions')
      .set('X-CSRF-Token', token())
      .set('Accept', 'application/json')
      .send({writer_session: {email, password}})
      .end((err, res)=> {
        if (err) {
          dispatch(requestRetryLogin());
        } else {
          dispatch(loginFinish());
          callback();
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

export function loginFinish() {
  return {type: Type.Login.LoggedIn};
}

