/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import { combineReducers } from 'redux'
import memo from './memo'
import tag from './tag'
import { routerStateReducer as router } from 'redux-router'

export default combineReducers(_.assign({}, memo, tag, {router}));
