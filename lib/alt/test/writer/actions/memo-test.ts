/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as MemoAction from '../src/actions/memo';
import MemoData from "../src/models/memo-data";
import * as Type from '../src/constants/action-types';
import * as nock from 'nock'

describe('MemoAction', ()=> {
  after(()=> nock.cleanAll());

  describe('checkLogin', ()=> {
    it('use LoginAction', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, {});

      MemoAction.checkLogin(()=> done(), ()=> null)((action)=> {
        assert.equal(action.type, Type.LOGIN_LOGGED_IN)
      });
    });
  });

  describe('index', ()=> {
    it('succeed', (done)=> {
      nock('http://localhost')
        .get('/w/api/memos?page=1&tag_ids=')
        .reply(200, []);

      MemoAction.index()((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_INDEX:
            return;
          case Type.MEMO_SHOW_INDEX:
            assert(action.indexData);
            done();
            return;
          default:
            assert(false);
        }
      });
    });

    it('fail', (done)=> {
      nock('http://localhost')
        .get('/w/api/memos?page=1&tag_ids=')
        .reply(500, {});

      MemoAction.index()((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_INDEX:
            return;
          case Type.MEMO_SHOW_INDEX_RETRY:
            done();
            return;
          default:
            assert(false);
        }
      });
    });
  });

  describe('saveMemo', ()=> {
    context('with new memo', ()=> {
      it('with valid params', (done)=> {
        nock('http://localhost')
          .post('/w/api/memos/new')
          .reply(200, {});

        MemoAction.saveMemo(new MemoData())((action)=> {
          switch (action.type) {
            case Type.MEMO_START_SAVING:
              return;
            case Type.MEMO_SUCCEED_SAVING:
              assert(action.memo);
              done();
              return;
            default:
              assert(false);
          }
        });
      });

      it('with invalid params', (done)=> {
        nock('http://localhost')
          .post('/w/api/memos/new')
          .reply(400, {});

        MemoAction.saveMemo(new MemoData())((action)=> {
          switch (action.type) {
            case Type.MEMO_START_SAVING:
              return;
            case Type.MEMO_FAIL_SAVING:
              assert(action.errors);
              done();
              return;
            default:
              assert(false);
          }
        });
      });
    });

    context('with persisted memo', ()=> {
      it('with valid params', (done)=> {
        nock('http://localhost')
          .patch('/w/api/memos/1')
          .reply(200, {});

        MemoAction.saveMemo(new MemoData({id: 1}))((action)=> {
          switch (action.type) {
            case Type.MEMO_START_SAVING:
              return;
            case Type.MEMO_SUCCEED_SAVING:
              assert(action.memo);
              done();
              return;
            default:
              assert(false);
          }
        });
      });

      it('with invalid params', (done)=> {
        nock('http://localhost')
          .patch('/w/api/memos/1')
          .reply(400, {});

        MemoAction.saveMemo(new MemoData({id: 1}))((action)=> {
          switch (action.type) {
            case Type.MEMO_START_SAVING:
              return;
            case Type.MEMO_FAIL_SAVING:
              assert(action.errors);
              done();
              return;
            default:
              assert(false);
          }
        });
      });
    });
  });


  describe('deleteMemo', ()=> {
    it('succeed', (done)=> {
      nock('http://localhost')
        .delete('/w/api/memos/1')
        .reply(200, {});

      MemoAction.deleteMemo(1, ()=> done())((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_INDEX:
            return;
          default:
            assert(false);
        }
      });
    });

    it('fail', (done)=> {
      nock('http://localhost')
        .delete('/w/api/memos/1')
        .reply(400, {});

      MemoAction.deleteMemo(1, ()=> done())((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_INDEX:
            return;
          default:
            assert(false);
        }
      });
    });
  });

  describe('editNewMemo', ()=> {
    it('', (done)=> {
      let action = MemoAction.editNewMemo()

      switch (action.type) {
        case Type.MEMO_START_EDITING:
          assert(!action.memo.isPersisted());
          done();
          return;
        default:
          assert(false);
      }
    });
  });

  describe('editMemoById', ()=> {
    it('with valid id', (done)=> {
      nock('http://localhost')
        .get('/w/api/memos/1')
        .reply(200, {id: 1});

      MemoAction.editMemoById(1)((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_EDITING:
            return;
          case Type.MEMO_EDIT_NEW_MEMO:
            assert(action.memo.isPersisted());
            done();
            return;
          default:
            assert(false);
        }
      });
    });

    it('with invalid id', (done)=> {
      nock('http://localhost')
        .get('/w/api/memos/1')
        .reply(404, {});

      MemoAction.editMemoById(1)((action)=> {
        switch (action.type) {
          case Type.MEMO_WAIT_EDITING:
            return;
          case Type.MEMO_EDIT_NEW_MEMO:
            assert(!action.memo.isPersisted());
            done();
            return;
          default:
            assert(false);
        }
      });
    });
  });

  describe('renderSlim', ()=>{
    it('with valid slim', (done)=>{
      nock('http://localhost')
        .post('/w/api/memos/slim')
        .reply(200, {html: 'html'});

      MemoAction.renderSlim('')((action)=> {
        switch (action.type) {
          case Type.MEMO_FINISH_RENDERING:
            assert.equal(action.html, 'html');
            done();
            return;
          default:
            assert(false);
        }
      });
    });

    it('with invalid slim', (done)=>{
      nock('http://localhost')
        .post('/w/api/memos/slim')
        .reply(500);

      MemoAction.renderSlim('')((action)=> {
        switch (action.type) {
          case Type.MEMO_FINISH_RENDERING:
            assert.equal(action.html, '書式が不正です');
            done();
            return;
          default:
            assert(false);
        }
      });
    });
  });
});