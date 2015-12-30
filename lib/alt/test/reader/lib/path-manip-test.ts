/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import {buildQueryString} from '../src/lib/path-manip';

describe('PathManip', ()=> {
  it('with a param', ()=>{
    let param = {key: 'value'};
    let result = buildQueryString(param);

    assert.equal(result, '?key=value');
  });

  it('with multiple params', ()=>{
    let param = {
      key1: 'value1',
      key2: 'value2'
    };
    let result = buildQueryString(param);

    assert.equal(result, '?key1=value1&key2=value2');
  });

  it('with value need to escape', ()=>{
    let param = {key: 'value,value'};
    let result = buildQueryString(param);

    assert.equal(result, '?key=value%2Cvalue');
  });

  it('with no params', ()=>{
    let param = {};
    let result = buildQueryString(param);

    assert.equal(result, '');
  });
});

