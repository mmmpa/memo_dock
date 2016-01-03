import {EventEmitter} from 'events';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import mix from '../lib/mix'

interface IEventingShared {
  emitter: EventEmitter
}

export const EventingShared = {emitter: React.PropTypes.object};

export class EventingParent {
  emitter:EventEmitter;
  listen:Function;

  static get childContextTypes() {
    return EventingShared;
  }

  initializeAsEventing() {
    this.listen((eventname:String, callback:Function) => {
      this._ep_getEmitter().on(eventname, callback);
    })
  }

  getChildContext() {
    return {emitter: this._ep_getEmitter()};
  }

  _ep_getEmitter(){
    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
    return this.emitter;
  }
}

export class EventingChild {
  context:IEventingShared;

  static get contextTypes() {
    return EventingShared;
  }

  dispatch(...args) {
    return this.context.emitter.emit(...args);
  }
}

export function mixParent(target) {
  mix(target, [EventingParent]);
  target.childContextTypes = EventingParent.childContextTypes;
}

export function mixChild(target) {
  mix(target, [EventingChild]);
  target.contextTypes = EventingChild.contextTypes;
}