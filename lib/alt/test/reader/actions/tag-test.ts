/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as TagAction from '../src/actions/tag';
import TagData from "../src/models/tag-data";
import * as Type from '../src/constants/action-types';
import * as nock from 'nock'

describe('TagAction', ()=> {
  after(()=> nock.cleanAll());
  before(()=> {
    nock('http://localhost')
      .get('/r/api/tags/')
      .reply(200, [
        {id: 1, name: 'name1'},
        {id: 2, name: 'name2'},
        {id: 3, name: 'name3'},
      ]);

    nock('http://localhost')
      .get('/r/api/tags/1')
      .reply(200, [
        {id: 1, name: 'name1'},
        {id: 2, name: 'name2'},
      ]);

    nock('http://localhost')
      .get('/r/api/tags/1%2C2')
      .reply(200, [
        {id: 1, name: 'name1'},
      ]);

    nock('http://localhost')
      .get('/r/api/tags/500')
      .reply(500);
  });

  describe('index', ()=> {
    it("index return a function", ()=> {
      assert.equal(_.isFunction(TagAction.index()), true);
    });

    context('execute index function', ()=> {
      context('with no tags', ()=> {
        it('get all tags', (done)=> {
          TagAction.index()((action)=> {
            switch (action.type) {
              case Type.TAG_SELECT:
                assert.deepEqual(action.tagIds, []);
                break;
              case Type.TAG_INDEX:
                assert.equal(action.tags.length, 3);
                done();
            }
          });
        });
      });

      context('with tags', ()=> {
        it('get 2 tags', (done)=> {
          TagAction.index([1])((action)=> {
            switch (action.type) {
              case Type.TAG_SELECT:
                assert.deepEqual(action.tagIds, [1]);
                break;
              case Type.TAG_INDEX:
                assert.equal(action.tags.length, 2);
                done();
                break;
            }
          });
        });

        it('get a tag', (done)=> {
          TagAction.index([1, 2])((action)=> {
            switch (action.type) {
              case Type.TAG_SELECT:
                assert.deepEqual(action.tagIds, [1, 2]);
                break;
              case Type.TAG_INDEX:
                assert.equal(action.tags.length, 1);
                done();
            }
          });
        });
      });

      context('some error', ()=> {
        it('get all tags', (done)=> {
          TagAction.index([500])((action)=> {
            switch (action.type) {
              case Type.TAG_INDEX:
                let {tags} = action;
                assert.equal(tags[0].name, 'error');
                done();
            }
          });
        });
      });
    });
  });
});

