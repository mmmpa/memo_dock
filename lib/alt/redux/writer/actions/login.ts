/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types';
const request = require('superagent');

export function token():string {
  return document.getElementsByName('csrf-token')[0].getAttribute('content');
}

export function requestLogin() {
  return {type: Type.Login.Request};
}

export function tryLogin(email:string, password:string) {
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
        } else {
          dispatch(login());
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

export function login() {
  return {type: Type.Login.LoggedIn};
}

export function logout() {
  return {type: Type.Login.LoggedOut};
}
