/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import mix from '../src/lib/mix';

class A {
  mixed1() {
    return true;
  }

  mixed2() {
    return true;
  }
}

class B {

}

class C {

}

class D {

}


describe('mix', (()=> {
  it('mix in all', ()=> {
    mix(B, [A]);
    let b = new B();
    assert(b.mixed1());
    assert(b.mixed2());
  });

  it('mix in all', ()=> {
    mix(D, [A], []);
    let d = new D();
    assert(d.mixed1());
    assert(d.mixed2());
  });

  it('mix in without excluded', ()=> {
    mix(C, [A], ['mixed2']);
    let c = new C();
    assert(c.mixed1());
    assert.throws(()=> c.mixed2());
  });
}));