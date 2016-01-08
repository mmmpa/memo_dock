/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import Menu from "../src/components/menu";

function setup() {

  let props = {};

  let rendered = TestUtils.renderIntoDocument(<Menu {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {dom, find, findAll, rendered}
}

describe('Menu',()=>{
  describe('dispatches', ()=>{
    it('index', (done)=>{
      let {dom, find, findAll, rendered} = setup();
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'link:index');
        done();
      };
      TestUtils.Simulate.click(findAll('.menu-list a')[0]);
    });

    it('newMemo', (done)=>{
      let {dom, find, findAll, rendered} = setup();
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'link:newMemo');
        done();
      };
      TestUtils.Simulate.click(findAll('.menu-list a')[1]);
    });

    it('logOut', (done)=>{
      let {dom, find, findAll, rendered} = setup();
      rendered.dispatch = (e, page)=>{
        assert.equal(e, 'logOut');
        done();
      };
      TestUtils.Simulate.click(findAll('.menu-list a')[2]);
    });
  });
});