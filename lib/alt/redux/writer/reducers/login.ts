/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import {LoginState} from '../constants/status'

function loginState(state:LoginState = LoginState.Request, action) {
  switch (action.type) {
    case Type.LOGIN_WAIT:
      return LoginState.Wait;
    case Type.LOGIN_REQUEST:
      return LoginState.Request;
    case Type.LOGIN_LOGGED_OUT:
      return LoginState.Request;
    case Type.LOGIN_REQUEST_RETRY:
      return LoginState.Invalid;
    case Type.LOGIN_LOGGED_IN:
      return LoginState.LoggedIn;
    default:
      return state;
  }
}

export default {loginState}
