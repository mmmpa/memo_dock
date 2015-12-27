/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import * as assert from 'power-assert';
import * as MemoAction from '../src/actions/memo';
import MemoData from "../src/models/memo-data";
import * as Type from '../src/constants/action-types';

describe("MemoAction", ()=>{
  context("show", ()=>{

    it("show return a function", ()=>{
      assert.equal(_.isFunction(MemoAction.show(1)), true);
    });

    it("showMemoData return an object", ()=>{
      let memo:MemoData = new MemoData();
      assert.deepEqual(MemoAction.showMemoData(memo), {type: Type.MEMO_SHOW, memo});
    });
  });

  context('index', ()=>{
    it("index return a function", ()=>{
      assert.equal(_.isFunction(MemoAction.index()), true);
    });
  })
});

