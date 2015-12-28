/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import * as assert from 'power-assert';
import TagReducer from '../src/reducers/tag';
import TagData from "../src/models/tag-data";
import * as Type from '../src/constants/action-types';

describe('TagReducer', ()=> {
  describe('tags', ()=> {
    it('default', ()=> {
      let state = TagReducer.tags(undefined, {type: ''});
      assert.deepEqual(state, []);
    });

    it('TAG_INDEX', ()=> {
      let tags = [new TagData({id: 1, name: 1}), new TagData({id: 2, name: 1})];
      let state = TagReducer.tags([], {type: Type.TAG_INDEX, tags});
      assert.equal(state, tags);
    });

    it('other', ()=> {
      let tags = [new TagData({id: 1}), new TagData({id: 2})];
      let state = TagReducer.tags(tags, {type: ''});
      assert.deepEqual(state, tags);
    });
  });

  describe('selectedTagIds', ()=> {
    it('default', ()=> {
      let state = TagReducer.selectedTagIds(undefined, {type: ''});
      assert.deepEqual(state, []);
    });

    it('TAG_SELECT', ()=> {
      let tagIds = [1,2];
      let state = TagReducer.selectedTagIds([], {type: Type.TAG_SELECT, tagIds});
      assert.deepEqual(state, [1,2]);
    });

    it('other', ()=> {
      let state = TagReducer.selectedTagIds([1,2], {type: ''});
      assert.deepEqual(state, [1,2]);
    });
  });
});
