/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import TagData from '../src/models/tag-data';

describe('TagData', ()=>{
  it('with plain object', ()=>{
    let tag = new TagData({id: 2, name: 'tag'});
    assert.equal(tag.id, 2);
    assert.equal(tag.name, 'tag');
  });
});