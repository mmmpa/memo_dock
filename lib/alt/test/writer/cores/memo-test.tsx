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
let changeSrc = MemoEdit.prototype['changeSrc'];

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

describe('MemoEdit', ()=> {
  before(()=> {
    MemoEdit.prototype['componentDidMount'] = ()=> null;
    MemoEdit.prototype['componentDidUpdate'] = function () {
      let {memoData} = this.state;
      if (this.props.memoData.id !== memoData.id) {
        this.state.memoData.id = memoData.id;
        this.setState({memoData: this.props.memoData});
      }
    };
    MemoEdit.prototype['changeSrc'] = function () {
      this.state.renderer();
    };
  });

  after(()=> {
    MemoEdit.prototype['componentDidMount'] = componentDidMount;
    MemoEdit.prototype['componentDidUpdate'] = componentDidUpdate;
    MemoEdit.prototype['changeSrc'] = changeSrc;
  });

  describe('check logged in', ()=> {
    it('not logged in', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});

      window.location.href = 'http://localhost/w/memos/new';

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

      window.location.href = 'http://localhost/w/memos/new';

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {

      }, ()=> {
        assert(find('article.memo-edit'));
        done();
      });
    });
  });

  describe('save', ()=> {
    beforeEach(()=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, ()=> {
          return {}
        });
    });

    it('new memo', (done)=> {
      nock('http://localhost')
        .post('/w/api/memos/new')
        .reply(200, {id: 1, title: '1'});

      nock('http://localhost')
        .patch('/w/api/memos/1')
        .reply(200, {});

      window.location.href = 'http://localhost/w/memos/new';

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
      }, ()=> {
        assert(find('.memo-edit.edit-container'));
        TestUtils.Simulate.click(find('.memo-edit.submit'));
      }, ()=> {
        assert(find('.memo-edit.edit-container'));
        TestUtils.Simulate.click(find('.memo-edit.submit'));
      }, ()=> {
      }, ()=> {
        assert(find('.memo-edit.edit-container'));
        done();
      });
    });

    it('edit memo', (done)=> {
      nock('http://localhost')
        .get('/w/api/memos/1')
        .reply(200,
          {id: 1, title: 'title1'});

      nock('http://localhost')
        .patch('/w/api/memos/1')
        .reply(200, {});

      window.location.href = 'http://localhost/w/memos/1';

      let {dom, find, findAll, rendered} = setup();

      combine(()=> {
      }, ()=> {
        assert(find('.memo-edit.edit-container'));
        TestUtils.Simulate.click(find('.memo-edit.submit'));
      }, ()=> {
        assert(find('.memo-edit.edit-container'));
        done();
      });
    });
  });
});


