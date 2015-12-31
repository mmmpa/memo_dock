/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as Reader from '../src/reader';
import * as nock from 'nock'

function setup(){
  let find = (selector)=> document.querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(document.querySelectorAll(selector));

  return {find, findAll};
}

describe('Reader', ()=> {
  after(()=> nock.cleanAll());
  before(()=> {
    nock.cleanAll();
    nock('http://localhost')
      .get('/r/api/memos')
      .reply(200,  [
          {id: 1, title: 'title1'},
          {id: 2, title: 'title2'},
          {id: 3, title: 'title3'},
          {id: 4, title: 'title4'}
        ]);
  });


  it('initial view', ()=> {
    let {find, findAll} = setup();
    assert.equal(findAll('.title-list.list a').length, 4);
  });
});
