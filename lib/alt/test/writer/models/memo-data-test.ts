/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import MemoData from '../src/models/memo-data';

describe('MemoData',()=>{
  context('with valid json', ()=>{

  });

  context('with no json', ()=>{
    it('got blank memo', ()=>{
      let memo = new MemoData();

      assert.ok(memo);
      assert.equal(memo.id, undefined);
    });
  });
});

