/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import TagData from '../src/models/tag-data';

describe('TagData', ()=> {
  describe('create', ()=> {
    it('with valid json', ()=> {
      let tag = new TagData({id: 1, name: 'tag1'});
      assert.ok(tag);
    });

    it('with no json', ()=> {
      assert.throws(()=> new TagData());
    });
  })
});