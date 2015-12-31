/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as ReactDOM from 'react-dom';
import Reader from '../src/reader';
import * as nock from 'nock'

function setup(){
  let rendered = Reader;
  let dom = ReactDOM.findDOMNode(rendered);
  let find = (selector)=> dom.querySelector(selector);
  let findAll = (selector)=> Array.prototype.slice.call(dom.querySelectorAll(selector));

  return {find, findAll};
}

describe('Reader', ()=> {
  after(()=> nock.cleanAll());
  before(()=>{
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
