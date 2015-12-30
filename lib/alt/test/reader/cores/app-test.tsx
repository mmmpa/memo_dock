/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as Reader from '../src/reader';
import * as nock from 'nock'

describe('Reader', ()=> {
  after(()=> nock.cleanAll());
  before(()=> {
    nock('http://localhost')
      .get('/r/api/memos')
      .reply(200, (()=> {
        console.log('index');
        return [
          {id: 1, title: 'title1'},
          {id: 2, title: 'title2'},
          {id: 3, title: 'title3'},
          {id: 4, title: 'title4'},
        ]
      })());

    Reader;
  });


  it('', ()=> {
    console.log(document.querySelectorAll('.title-list.list a'));
  });
});
