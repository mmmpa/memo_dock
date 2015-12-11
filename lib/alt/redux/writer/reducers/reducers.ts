/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import { combineReducers } from 'redux'
import login from './login'
import memo from './memo'

export default combineReducers(_.assign({}, login, memo));
