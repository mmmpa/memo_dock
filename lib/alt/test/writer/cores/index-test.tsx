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
import MemoEdit from "../src/components/memo-edit";

let componentDidMount = MemoEdit.prototype['componentDidMount'];
let componentDidUpdate = MemoEdit.prototype['componentDidUpdate'];

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

describe('Index', ()=> {
  before(()=> {
    MemoEdit.prototype['componentDidMount'] = ()=> null;
    MemoEdit.prototype['componentDidUpdate'] = ()=> null;
  });

  after(()=> {
    MemoEdit.prototype['componentDidMount'] = componentDidMount;
    MemoEdit.prototype['componentDidUpdate'] = componentDidUpdate;
  });

  describe('check logged in', ()=> {
    it('not logged in', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});

      window.location.href = 'http://localhost/w/memos/';

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
      }, ()=> {
        assert(find('.login.container'));
        done();
      });
    });

    it('logged in', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, ()=> {
          return {}
        });

      nock('http://localhost')
        .get('/w/api/memos?page=1&tag_ids=')
        .reply(200, []);

      window.location.href = 'http://localhost/w/memos/';

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {

      }, ()=> {
        assert(find('article.memo-index'));
        done();
      });
    });
  });

  describe('indexing', ()=> {
    beforeEach(()=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, ()=> {
          return {}
        });

      nock('http://localhost')
        .get('/w/api/memos?page=1&tag_ids=')
        .reply(200, [
          {id: 1, title: 'title1'},
          {id: 2, title: 'title2'},
          {id: 3, title: 'title3', tags: [{id: 1, name: 'tag1'}]}
        ]);

      nock('http://localhost')
        .get('/w/api/memos?page=2&tag_ids=')
        .reply(200, [
          {id: 4, title: 'title4'}
        ]);

      nock('http://localhost')
        .get('/w/api/memos?page=1&tag_ids=2')
        .reply(200, [
          {id: 1, title: 'title1'},
          {id: 3, title: 'title3', tags: [{id: 1, name: 'tag1'}]}
        ]);
    });

    describe('link', ()=> {
      it('memo', (done)=> {
        window.location.href = 'http://localhost/w/memos/';

        let {dom, find, findAll, rendered} = setup();

        combine(()=> {
        }, ()=> {
          TestUtils.Simulate.click(findAll('td.title a')[0]);
          assert(find('.memo-edit.edit-container'));
          done();
        });
      });
    });

    describe('indexing', ()=> {
      it('indexing', (done)=> {
        window.location.href = 'http://localhost/w/memos/';

        let {dom, find, findAll, rendered} = setup();

        combine(()=> {
          assert.equal(findAll('td.title').length, 3);
        }, ()=> {
          done();
        });
      });

      it('tagged', (done)=> {
        window.location.href = 'http://localhost/w/memos/?tagIds=2';

        let {dom, find, findAll, rendered} = setup();

        combine(()=> {
          assert.equal(findAll('td.title').length, 2);
        }, ()=> {
          done();
        });
      });

      it('paged', (done)=> {
        window.location.href = 'http://localhost/w/memos/?page=2';

        let {dom, find, findAll, rendered} = setup();

        combine(()=> {
          assert.equal(findAll('td.title').length, 1);
        }, ()=> {
          done();
        });
      });
    });
  });
});


