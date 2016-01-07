/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoEdit from "../src/components/memo-edit";
import MemoData from "../src/models/memo-data";
import {EditMemoState} from '../src/constants/status'

let componentDidMount = MemoEdit.prototype['componentDidMount'];
let componentDidUpdate = MemoEdit.prototype['componentDidUpdate'];

function setup(memoData = new MemoData(), editState = EditMemoState.Ready, rendered = '', memoMessage = {}) {

  MemoEdit.prototype['componentDidMount'] = ()=> null;
  MemoEdit.prototype['componentDidUpdate'] = ()=> null;

  let props = {memoData, editState, rendered, memoMessage};

  let rendered = TestUtils.renderIntoDocument(<MemoEdit {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {rendered, dom, find, findAll}
}

describe('MemoEditComponent', ()=> {
  before(()=> {
    MemoEdit.prototype['componentDidMount'] = ()=> null;
    MemoEdit.prototype['componentDidUpdate'] = ()=> null;
  });

  after(()=> {
    MemoEdit.prototype['componentDidMount'] = componentDidMount;
    MemoEdit.prototype['componentDidUpdate'] = componentDidUpdate;
  });

  describe('detect save button', ()=> {
    it('when ready', ()=> {
      let {dom, find, findAll} = setup(undefined, EditMemoState.Ready);
      assert.equal(find('.memo-edit.submit span').innerHTML, 'Save');
    });

    it('when ready', ()=> {
      let {dom, find, findAll} = setup(undefined, EditMemoState.Loading);
      assert.equal(find('.memo-edit.submit span').innerHTML, 'Wait...');
    });

    it('when ready', ()=> {
      let {dom, find, findAll} = setup(undefined, EditMemoState.Saving);
      assert.equal(find('.memo-edit.submit span').innerHTML, 'Saving...');
    });
  });

  describe('write message', ()=> {
    it('with messages', ()=>{
      let {dom, find, findAll} = setup(undefined, EditMemoState.Ready, undefined, {
        messages: {
          save: 'succeed',
          test: 'this is test'
        }
      });

      assert.equal(findAll('.memo-edit.error-area li.error').length, 0);
      assert.equal(findAll('.memo-edit.error-area li.message').length, 2);
    });

    it('with error messages', ()=>{
      let {dom, find, findAll} = setup(undefined, EditMemoState.Ready, undefined, {
        errors: {
          html: 'invalid'
        }
      });

      assert.equal(findAll('.memo-edit.error-area li.error').length, 1);
      assert.equal(findAll('.memo-edit.error-area li.message').length, 0);
    });

    it('with errors and messages', ()=>{
      let {dom, find, findAll} = setup(undefined, EditMemoState.Ready, undefined, {
        messages: {
          save: 'succeed',
          test: 'this is test'
        },
        errors: {
          html: 'invalid'
        }
      });

      assert.equal(findAll('.memo-edit.error-area li.error').length, 1);
      assert.equal(findAll('.memo-edit.error-area li.message').length, 2);
    });

    it('with no messages', ()=>{
      let {dom, find, findAll} = setup(undefined, EditMemoState.Ready, undefined, null);

      assert.equal(findAll('.memo-edit.error-area li.error').length, 0);
      assert.equal(findAll('.memo-edit.error-area li.message').length, 0);
    });
  });

  describe('set state on change', ()=> {
    it('default', ()=> {
      let {dom, find, findAll, rendered} = setup();

      assert.equal(rendered.state.memoData.title, '');
      assert.equal(rendered.state.memoData.tags, '');
      assert.equal(rendered.state.memoData.src, '');
      assert.equal(rendered.state.memoData.isPublic, false);
    });

    it('after change title', ()=> {
      let {dom, find, findAll, rendered} = setup();

      assert.equal(rendered.state.memoData.title, '');

      let title = find('.memo-edit.title input');
      title.value = 'new title';
      TestUtils.Simulate.change(title);

      assert.equal(rendered.state.memoData.title, 'new title');
    });

    it('after change tags', ()=> {
      let {dom, find, findAll, rendered} = setup();

      assert.equal(rendered.state.memoData.tagList, '');

      let tags = find('.memo-edit.tags input');
      tags.value = 'new tag';
      TestUtils.Simulate.change(tags);

      assert.equal(rendered.state.memoData.tagList, 'new tag');
    });

    it('after change public', ()=> {
      let {dom, find, findAll, rendered} = setup();

      assert.equal(rendered.state.memoData.tagList, '');

      let publish = find('.memo-edit.public input');
      TestUtils.Simulate.change(publish);

      assert.equal(rendered.state.memoData.isPublic, true);
    });
  });

  describe('dispatches', ()=> {
    it('save', (done)=> {
      let {dom, find, findAll, rendered} = setup(new MemoData({id: 1, title: 'test'}));
      rendered.dispatch = (e, memo)=> {
        assert.equal(e, 'save');
        assert.equal(memo.id, 1);
        assert.equal(memo.title, 'test');
        done();
      };

      let submit = find('.memo-edit.submit');
      TestUtils.Simulate.click(submit);
    });

    it('render slim', (done)=> {
      let {dom, find, findAll, rendered} = setup(new MemoData({src: 'test'}));
      rendered.dispatch = (e, src)=> {
        assert.equal(e, 'render');
        assert.equal(src, 'test');
        done();
      };

      rendered.state.renderer();
    });
  });
});