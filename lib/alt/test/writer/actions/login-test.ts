/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as LoginAction from '../src/actions/login';
import * as Type from '../src/constants/action-types';
import * as nock from 'nock'

describe('LoginAction', ()=> {
  after(()=> nock.cleanAll());
  describe('token', ()=> {
    it('get token', ()=> {
      assert.equal(LoginAction.token(), 'token');
    });
  });

  describe('checkInitialState', ()=> {
    it('when logged in', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(200, {});

      LoginAction.checkInitialState(()=> done(), ()=> null)((action)=> {
        assert.equal(action.type, Type.LOGIN_LOGGED_IN)
      });
    });

    it('when not logged in', (done)=> {
      nock('http://localhost')
        .get('/w/api/sessions')
        .reply(404, {});

      LoginAction.checkInitialState(()=> null, ()=> done())((action)=> {
        assert.equal(action.type, Type.LOGIN_REQUEST)
      });
    });
  });

  describe('logout', ()=> {
    it('when succeed', (done)=> {
      nock('http://localhost')
        .delete('/w/api/sessions')
        .reply(201, {});

      LoginAction.logOut(()=> done(), ()=> null)((action)=> {
        assert.equal(action.type, Type.LOGIN_REQUEST)
      });
    });

    it('when fail', (done)=> {
      nock('http://localhost')
        .delete('/w/api/sessions')
        .reply(500, {});

      LoginAction.logOut(()=> null, ()=> done())((action)=> null);
    });
  });

  describe('login', ()=> {
    it('when succeed', (done)=> {
      nock('http://localhost')
        .post('/w/api/sessions')
        .reply(200, {});

      LoginAction.login('a', 'b', ()=> done(), ()=> null)((action)=> {
        switch (action.type) {
          case Type.LOGIN_WAIT:
            return;
          case Type.LOGIN_LOGGED_IN:
            return;
          default:
            assert(false);
        }
      });
    });

    it('when fail', (done)=> {
      nock('http://localhost')
        .post('/w/api/sessions')
        .reply(400, {});

      LoginAction.login('a', 'b',()=> null, ()=> done())((action)=> {
        switch (action.type) {
          case Type.LOGIN_WAIT:
            return;
          case Type.LOGIN_REQUEST_RETRY:
            return;
          default:
            assert(false);
        }
      });
    });
  });
});
