/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import MemoIndexData from '../src/models/memo-index-data';

describe('MemoIndexData', ()=> {
  describe('create', ()=> {
    it('with valid json', ()=> {
      let indexData = new MemoIndexData(
        [
          {id: 1, title: 'title', src: 'a src', public: true, tags: []},
          {id: 2, title: 'title', src: 'a src', public: true, tags: []}
        ],
        {
          "page": "2",
          "par": "20",
          "total-pages": "10",
          "tag-ids": "5"
        }
      );
      assert.ok(indexData);
    });

    it('with valid json', ()=> {
      assert.throws(()=> new MemoIndexData());
    });
  });

  describe('check tagged', ()=> {
    it('with no tag ids', ()=> {
      let indexData = new MemoIndexData(
        [],
        {
          "page": "2",
          "par": "20",
          "total-pages": "10",
          "tag-ids": ""
        }
      );
      assert.ok(!indexData.isSelectedTag());
    });

    it('with tag ids', ()=> {
      let indexData = new MemoIndexData(
        [],
        {
          "page": "2",
          "par": "20",
          "total-pages": "10",
          "tag-ids": "1"
        }
      );
      assert.ok(indexData.isSelectedTag());
    });
  });

  describe('clone', ()=> {
    it('clone function do not clone', ()=> {
      let indexData = new MemoIndexData(
        [],
        {
          "page": "2",
          "par": "20",
          "total-pages": "10",
          "tag-ids": "1"
        }
      );
      assert.equal(indexData, indexData.clone());

    });
  });
});