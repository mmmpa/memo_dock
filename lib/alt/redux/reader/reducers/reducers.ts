/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import { combineReducers } from 'redux'
import memo from './memo'
import tag from './tag'

export default combineReducers(_.assign({}, memo, tag));
