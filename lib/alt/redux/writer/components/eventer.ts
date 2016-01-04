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
    let em:EventEmitter = this._ep_getEmitter();
    this.listen((eventname:string, callback:Function) => {
      em.on(eventname, callback);
    });
  }

  getChildContext():IEventingShared {
    return {emitter: this._ep_getEmitter()};
  }

  _ep_getEmitter():EventEmitter {
    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
    return this.emitter;
  }
}

export class EventingChild {
  context:IEventingShared;

  static get contextTypes():IEventingShared {
    return EventingShared;
  }

  dispatch(event:string, ...args:any[]):boolean {
    return this.context.emitter.emit(...[event, ...args]);
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