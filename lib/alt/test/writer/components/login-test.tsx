/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import Login from "../src/components/login";
import {LoginState} from '../src/constants/status'

function setup(state:LoginState = LoginState.Request) {

  let props = {
    loginState: state
  };

  let rendered = TestUtils.renderIntoDocument(<Login {...props} />);
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> dom.querySelectorAll(selector);

  return {rendered, dom, find, findAll}
}

describe('LoginComponent', ()=> {
  describe('detect content with state', ()=> {
    it('default', ()=> {
      let {dom, find, findAll} = setup(LoginState.Request);
      assert.equal(findAll('.login.state').length, 0);
      assert.equal(find('.login.submit span').innerHTML, 'Login');
    });

    it('Wait', ()=> {
      let {dom, find, findAll} = setup(LoginState.Wait);
      assert.equal(findAll('.login.state').length, 0);
      assert.equal(find('.login.submit span').innerHTML, 'Wait');
    });

    it('Invalid', ()=> {
      let {dom, find, findAll} = setup(LoginState.Invalid);
      assert.equal(findAll('.login.state').length, 1);
    });
  });

  describe('store inputted params in state', ()=> {
    it('email', ()=> {
      let {rendered, dom, find, findAll} = setup();
      let email = find('.login.input.email');

      assert.equal(rendered.state.email, '');

      email.value = 'email';
      TestUtils.Simulate.change(email);
      assert.equal(rendered.state.email, 'email');
    });

    it('password', ()=> {
      let {rendered, dom, find, findAll} = setup();
      let password = find('.login.input.password');

      assert.equal(rendered.state.password, '');

      password.value = 'password';
      TestUtils.Simulate.change(password);
      assert.equal(rendered.state.password, 'password');
    });
  });

  describe('dispatch', ()=> {
    context('login', ()=> {
      it('with blank params', (done)=>{
        let {rendered, dom, find, findAll} = setup();

        let email = find('.login.input.email');
        let password = find('.login.input.password');
        let submit = find('.login.submit');

        rendered.dispatch = (e, email, password)=> {
          switch(e){
            case 'login':
              assert.equal(email, '');
              assert.equal(password, '');
              done();
              return;
            default:
              assert(false);
          }
        };

        TestUtils.Simulate.click(submit);
      });

      it('with changed params', (done)=>{
        let {rendered, dom, find, findAll} = setup();

        let email = find('.login.input.email');
        let password = find('.login.input.password');
        let submit = find('.login.submit');

        email.value = 'email';
        TestUtils.Simulate.change(email);

        password.value = 'password';
        TestUtils.Simulate.change(password);

        rendered.dispatch = (e, email, password)=> {
          switch(e){
            case 'login':
              assert.equal(email, 'email');
              assert.equal(password, 'password');
              done();
              return;
            default:
              assert(false);
          }
        };

        TestUtils.Simulate.click(submit);
      });
    });
  });
});
