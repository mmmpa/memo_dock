/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import TagList from "../src/components/tag-list";
import TagData from "../src/models/tag-data";

function setup(tags:TagData[] = [], tagIds:number[] = [], selectTagCallback:Function = ()=>null) {
  let app = {
    selectTag: selectTagCallback
  };

  let props = {
    tags: tags,
    selectedTagIds: tagIds,
    windowHeight: 800,
    app
  };

  let rendered = TestUtils.renderIntoDocument(<TagList {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(dom.querySelectorAll(selector));
  let findAndEach = (selector, f)=> {
    let selected = dom.querySelectorAll(selector);
    for (let i = 0, l = selected.length; i < l; i++) {
      f(selected.item(i), i);
    }
  };

  return {dom, find, findAll, findAndEach}
}

describe('TagListComponent', () => {
  describe('display', ()=> {
    it('with no tags', ()=> {
      const { dom, find } = setup();

      assert.equal(find('.tag-list.list li'), null);
    });

    context('with tags', ()=> {
      it('with no selected ids', ()=> {
        const { dom, find, findAll } = setup([
          new TagData({id: 1, name: 'tag1'}),
          new TagData({id: 2, name: 'tag2'})
        ]);

        assert.equal(findAll('.tag-list.list li').length, 2);
        assert.equal(findAll('.tag-list.list li input[checked="checked"]').length, 0);
      });

      it('with selected ids', ()=> {
        const { dom, find, findAll, findAndEach } = setup([
          new TagData({id: 1, name: 'tag1'}),
          new TagData({id: 2, name: 'tag2'})
        ], [1]);

        assert.equal(findAll('.tag-list.list li').length, 2);
        findAll('.tag-list.list input').map((input)=> {
          if (input.value == 1) {
            assert.equal(input.checked, true);
          } else {
            assert.equal(input.checked, false);
          }
        });
      });

      it('with invalid ids', ()=> {
        const { dom, find, findAll, findAndEach } = setup([
          new TagData({id: 1, name: 'tag1'}),
          new TagData({id: 2, name: 'tag2'})
        ], [10]);

        assert.equal(findAll('.tag-list.list li').length, 2);
        assert.equal(findAll('.tag-list.list li input[checked="checked"]').length, 0);
      });
    })
  });

  describe('select tag', ()=> {
    it('select', ()=> {
      const { dom, find, findAll } = setup([
        new TagData({id: 1, name: 'tag1'}),
        new TagData({id: 2, name: 'tag2'})
      ], [], (ids)=> {
        assert.deepEqual(ids, [1])
      });

      let input = findAll('.tag-list.list li input')[0];
      TestUtils.Simulate.change(input);
      assert.equal(findAll('.tag-list.list li').length, 2);
      assert.equal(findAll('.tag-list.list li[checked]').length, 0);
    });

    it('remove selection', ()=> {
      const { dom, find, findAll } = setup([
        new TagData({id: 1, name: 'tag1'}),
        new TagData({id: 2, name: 'tag2'})
      ], [1], (ids)=> {
        assert.deepEqual(ids, [])
      });

      let input = findAll('.tag-list.list li input')[0];
      TestUtils.Simulate.change(input);
      assert.equal(findAll('.tag-list.list li').length, 2);
      assert.equal(findAll('.tag-list.list li[checked]').length, 0);
    });

    it('add selection', ()=> {
      const { dom, find, findAll } = setup([
        new TagData({id: 1, name: 'tag1'}),
        new TagData({id: 2, name: 'tag2'})
      ], [2], (ids)=> {
        assert.deepEqual(ids, [2, 1])
      });

      let input = findAll('.tag-list.list li input')[0];
      TestUtils.Simulate.change(input);
      assert.equal(findAll('.tag-list.list li').length, 2);
      assert.equal(findAll('.tag-list.list li[checked]').length, 0);
    });
  });
});