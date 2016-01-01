/// <reference path="../src/types/tsd.d.ts" />

import * as _ from 'lodash';
import assert from 'power-assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils'

import Fa from "../src/lib/components/fa";

describe('FontAwesome', () => {
  it('only icon', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon=  'paw'
      />));

    assert.ok(dom.getAttribute('class').match('fa-paw'));
    assert.ok(dom.getAttribute('class').match('fa-fw'));
    assert.ok(!dom.getAttribute('class').match('fa-li'));
    assert.ok(!dom.getAttribute('class').match('fa-li'));
    assert.ok(!dom.getAttribute('class').match('fa-border'));
    assert.ok(!dom.getAttribute('class').match('fa-pull'));
    assert.ok(!dom.getAttribute('class').match('fa-rotate'));
    assert.ok(!dom.getAttribute('class').match('fa-flip'));
  });

  it('scale', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      scale={2}
    />));
    assert.ok(dom.getAttribute('class').match('fa-2x'));
  });

  it('fixedWidth', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      fixedWidth={false}
    />));
    assert.ok(!dom.getAttribute('class').match('fa-fw'));
  });

  it('list', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      list={true}
    />));
    assert.ok(dom.getAttribute('class').match('fa-li'));
  });

  it('border', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      border={true}
    />));
    assert.ok(dom.getAttribute('class').match('fa-border'));
  });

  it('pull', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      pull='left'
    />));
    assert.ok(dom.getAttribute('class').match('fa-pull-left'));
  });

  it('animation', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      animation='pulse'
    />));
    assert.ok(dom.getAttribute('class').match('fa-pulse'));
  });

  it('rotate', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      rotate={180}
    />));
    assert.ok(dom.getAttribute('class').match('fa-rotate-180'));
  });

  it('flip', ()=> {
    let dom = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(<Fa
      icon='paw'
      flip='vertical'
    />));
    assert.ok(dom.getAttribute('class').match('fa-flip-vertical'));
  });
});