/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import MemoIndexLine from "../src/components/memo-index-line";
import MemoData from "../src/models/memo-data";

function setup(memoData = new MemoData({id:1, title: 'memo'}), isEnable = true, dispatch = (e, id)=> null) {

  let props = {
    key: 1,
    isEnable,
    memoData
  };

  let c = MemoIndexLine.prototype['componentWillMount'];
  MemoIndexLine.prototype['componentWillMount'] = function(){
    this.dispatch = dispatch;
  };

  let rendered = TestUtils.renderIntoDocument(<table><MemoIndexLine {...props} /></table>);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  MemoIndexLine.prototype['componentWillMount'] = c;

  return {dom, find, findAll, rendered}
}

describe('MemoIndexLine', ()=>{
  describe('render', ()=>{
    describe('enable', ()=>{
      it('when is enable', ()=>{
        let {dom, find, findAll} = setup();
        assert.ok(!find('.disabled'))
      });

      it('when is not enable', ()=>{
        let {dom, find, findAll} = setup(undefined, false);
        assert.ok(find('.disabled'))
      });
    });

    describe('detect public text', ()=>{
      it('public', ()=>{
        let {dom, find, findAll} = setup(new MemoData({'public': true}));
        assert.equal(find('.public').innerHTML, '公開')
      });

      it('draft', ()=>{
        let {dom, find, findAll} = setup(new MemoData({'public': false}));
        assert.equal(find('.public').innerHTML, '下書き')
      });
    });

    describe('tag links', ()=>{
      it('has tags', ()=>{
        let {dom, find, findAll} = setup(new MemoData({'tags': [
          {id: 1, name: 'tag1'},
          {id: 2, name: 'tag2'},
        ]}));
        assert.equal(find('.tags').children.length, 2)
      });

      it('has no tag', ()=>{
        let {dom, find, findAll} = setup(new MemoData());
        assert.equal(find('.public').children.length, 0)
      });
    });
  });

  describe('dispatches', ()=>{
    it('tag', (done)=>{
      let {dom, find, findAll, rendered} = setup(undefined, undefined, (e, id)=>{
        assert.equal(e, 'memo:edit');
        assert.deepEqual(id, 1);
        done();
      });

      let anchor = find('a');
      TestUtils.Simulate.click(anchor);
    });

    it('delete', (done)=>{
      let {dom, find, findAll, rendered} = setup(undefined, undefined, (e, id)=>{
        assert.equal(e, 'memo:delete');
        assert.deepEqual(id, 1);
        done();
      });

      let button = find('button');
      TestUtils.Simulate.click(button);
    });
  });
});