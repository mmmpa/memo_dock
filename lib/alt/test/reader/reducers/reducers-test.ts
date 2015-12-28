/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import combineReducers from '../src/reducers/reducers';
import TagData from "../src/models/tag-data";
import * as Type from '../src/constants/action-types';

describe('all reducers', ()=> {
  it('', ()=> {
    assert.equal(_.isFunction(combineReducers), true);
  });
});