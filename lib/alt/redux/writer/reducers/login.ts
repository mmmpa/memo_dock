/// <reference path="../types/tsd.d.ts" />

import * as Type from '../action-types'
import * as _ from 'lodash'

function loggedIn(state = false, action) {
  switch (action.type) {
    case Type.LOGIN:
      return true;
    case Type.LOGOUT:
      return false;
    default:
      return state;
  }
}

export default {loggedIn}
