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


function setup() {
  const store = configureStore({});
  let rendered = TestUtils.renderIntoDocument(<Provider store={store}>
    <ReduxRouter/>
  </Provider>);

  let dom = ()=> ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom().querySelector(selector);
  let findAll = (selector)=> dom().querySelectorAll(selector);

  return {dom, find, findAll, rendered}
}

function combine(...args) {
  let doTask = (taskList)=> {
    let task = taskList.shift();
    if (task) {
      setTimeout(()=> {
        task();
        doTask(taskList);
      }, 50);
    }
  };
  doTask(args);
}

describe('Login', ()=> {
  describe('check logged in', ()=>{
    it('not logged in', (done)=>{
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
      },()=>{
        assert(find('.login.container'));
        done();
      });
    });

    it('logged in', (done)=>{
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, ()=>{
          return {}
        });

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
      },()=>{
        assert(!find('.login.container'));
        done();
      });
    });
  });

  describe('login', ()=>{
    it('succeed', (done)=>{
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});
      nock('http://localhost')
        .post('/w/api/sessions')
        .reply(200, {});

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
        assert(find('.login.container'));
        TestUtils.Simulate.click(find('.login.submit'));
        assert(find('.login.submit.wait'));
      },()=>{
        assert(!find('.login.container'));
        done();
      });
    });

    it('fail', (done)=>{
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});
      nock('http://localhost')
        .post('/w/api/sessions')
        .reply(400, {});

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
        assert(find('.login.container'));
        TestUtils.Simulate.click(find('.login.submit'));
        assert(find('.login.submit.wait'));
      },()=>{
        assert(find('.login.state'));
        done();
      });
    });
  });
});


