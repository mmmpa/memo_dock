/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import {LoginState} from '../constants/status'

function loginState(state:LoginState = LoginState.Ready, action) {
  switch (action.type) {
    case Type.Login.Wait:
      return LoginState.Wait;
    case Type.Login.Request:
      return LoginState.Request;
    case Type.Login.LoggedOut:
      return LoginState.Request;
    case Type.Login.RequestRetry:
      return LoginState.Invalid;
    case Type.Login.LoggedIn:
      return LoginState.LoggedIn;
    default:
      return state;
  }
}

function afterLoginUri(state:string = null, action){
  switch (action.type) {
    case Type.Login.Request:
      return action.afterLoginUri;
    default:
      return state;
  }
}

export default {loginState, afterLoginUri}
