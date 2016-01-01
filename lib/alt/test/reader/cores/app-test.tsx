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

function setup() {
  const html = document.getElementById('nojs');
  const store = configureStore({html});
  let rendered = TestUtils.renderIntoDocument(<Provider store={store}>
    <ReduxRouter/>
  </Provider>);

  let dom = ()=> ReactDOM.findDOMNode(rendered)
    ;

  let find = (selector)=> dom().querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(dom().querySelectorAll(selector));

  return {dom, find, findAll}
}

describe('Reader', ()=> {
  after(()=> nock.cleanAll());
  before(()=> {
    nock.cleanAll();
    nock('http://localhost')
      .get('/r/api/memos')
      .reply(200, [
        {id: 1, title: 'title1'},
        {
          id: 2, title: 'title2', tags: [
          {id: 1, name: 'tag1'},
          {id: 2, name: 'tag2'},
          {id: 3, name: 'tag3'}
        ]
        },
        {id: 3, title: 'title3'},
        {id: 4, title: 'title4'}
      ]);
    nock('http://localhost')
      .get('/r/api/memos?tag_ids=1')
      .reply(200, [
        {id: 1, title: 'title1'}
      ]);
    nock('http://localhost')
      .get('/r/api/memos?tag_ids=2')
      .reply(200, [
        {id: 1, title: 'title1'},
        {id: 3, title: 'title3'},
        {id: 4, title: 'title4'}
      ]);
    nock('http://localhost')
      .get('/r/api/tags/')
      .reply(200, [
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'},
        {id: 3, name: 'tag3'}
      ]);
    nock('http://localhost')
      .get('/r/api/tags/1')
      .reply(200, [
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'}
      ]);
    nock('http://localhost')
      .get('/r/api/tags/2')
      .reply(200, [
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'},
        {id: 3, name: 'tag3'},
        {id: 4, name: 'tag4'},
        {id: 5, name: 'tag5'}
      ]);
    nock('http://localhost')
      .get('/r/api/memos/1')
      .reply(200, (()=> {
        return {
          id: 1,
          title: 'title1',
          html: '<h1>title1</h1>'
        }
      })());
    nock('http://localhost')
      .get('/r/api/memos/2')
      .reply(200, (()=> {
        return {
          id: 2,
          title: 'title2',
          html: '<h1>title2</h1>',
          tags: [
            {id: 1, name: 'tag1'},
            {id: 2, name: 'tag2'},
            {id: 3, name: 'tag3'}
          ]
        }
      })());
  });

  it('initial view', (done)=> {
    const { dom, find, findAll } = setup();
    combine(()=> {
      let titles = findAll('.title-list li a');
      assert.equal(titles.length, 4);
      assert.equal(findAll('.tag-list.list input').length, 3);
      TestUtils.Simulate.click(find('.title-list li a'));
    }, ()=> {
      assert.equal(find('.memo.memo-title').innerHTML, 'title1');
    }, ()=> {
      let titles = findAll('.title-list li a');
      TestUtils.Simulate.click(titles[1]);
    }, ()=> {
      assert.equal(find('.memo.memo-title').innerHTML, 'title2');
    }, ()=> {
      let tags = findAll('.tag-list.list input');
      TestUtils.Simulate.change(tags[0]);
    }, ()=> {
      assert.equal(findAll('.title-list li a').length, 1);
      assert.equal(findAll('.tag-list.list input').length, 2);
    }, ()=> {
      TestUtils.Simulate.click(findAll('.memo.tag a')[1]);
    }, ()=> {
      assert.equal(findAll('.title-list li a').length, 3);
      assert.equal(findAll('.tag-list.list input').length, 5);
    }, ()=> {
      console.log(dom.innerHTML)
      done();

    });
  });
});


