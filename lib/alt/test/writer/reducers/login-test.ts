/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import LoginReducer from '../src/reducers/login';
import * as Type from '../src/constants/action-types'
import {LoginState} from '../src/constants/status'


describe('LoginReducer', ()=>{
  it('default', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {}), LoginState.Request);
  });

  it('wait', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {type: Type.LOGIN_WAIT}), LoginState.Wait);
  });

  it('request', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {type: Type.LOGIN_REQUEST}), LoginState.Request);
  });

  it('logged out', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {type: Type.LOGIN_LOGGED_OUT}), LoginState.Request);
  });

  it('retry', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {type: Type.LOGIN_REQUEST_RETRY}), LoginState.Invalid);
  });

  it('logged in', ()=>{
    assert.equal(LoginReducer.loginState(undefined, {type: Type.LOGIN_LOGGED_IN}), LoginState.LoggedIn);
  });

  it('other', ()=>{
    assert.equal(LoginReducer.loginState(LoginState.Wait, {type: Type.LOGIN_WAIT}), LoginState.Wait);
  });
});