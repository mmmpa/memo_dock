/// <reference path="../types/tsd.d.ts" />

import * as Type from '../constants/action-types'
import * as _ from 'lodash'
import * as Status from '../constants/status'

function loggedIn(state = false, action) {
  switch (action.type) {
    case Type.Login.LoggedIn:
      return true;
    case Type.Login.LoggedOut:
      return false;
    default:
      return state;
  }
}

function loginState(state:Status.Login = Status.Login.Ready, action) {
  switch (action.type) {
    case Type.Login.Wait:
      return Status.Login.Wait;
    case Type.Login.Request:
      return Status.Login.Request;
    case Type.Login.RequestRetry:
      return Status.Login.Invalid;
    case Type.Login.LoggedIn:
      return Status.Login.LoggedIn;
    default:
      return state;
  }

}

export default {loggedIn, loginState}
