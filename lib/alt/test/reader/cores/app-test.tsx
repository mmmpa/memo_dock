/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as ReactDOM from 'react-dom';
import * as nock from 'nock'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import configureStore from '../src/store/configure-store'

function setup(){
  const html = document.getElementById('nojs');
  const store = configureStore({html});
  let rendered = TestUtils.renderIntoDocument(<Provider store={store}>
    <ReduxRouter/>
  </Provider>);;
  let dom = ReactDOM.findDOMNode(rendered);;
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(dom.querySelectorAll(selector));

  return {dom, find, findAll}
}

describe('Reader', ()=> {
  after(()=> nock.cleanAll());
  before(()=>{
    nock.cleanAll();
    nock('http://localhost')
      .get('/r/api/memos')
      .reply(200,  (()=>{
        return [
          {id: 1, title: 'title1'},
          {id: 2, title: 'title2'},
          {id: 3, title: 'title3'},
          {id: 4, title: 'title4'}
        ]
      })());
  });

  it('initial view', (done)=> {
    const { dom, findAll } = setup();
    setTimeout(()=>{
      assert.equal(findAll('.title-list li').length, 4);
      done();
    },50)
  });
});
