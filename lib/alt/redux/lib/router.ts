/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'

class RouterNode {
  public next:{[id:string]: RouterNode};
  public app:Function;
  public parameters:string[];

  constructor() {
    this.next = {};
  }

  add(name:string):RouterNode {
    return this.next[name] = new RouterNode();
  }

  findOrCreate(name:string):RouterNode {
    return this.find(name) || this.add(name);
  }

  find(name:string):RouterNode{
    return this.next[name];
  }
}

export default class Router {
  private map:any;
  private mapped:{[id: string]: boolean};
  private normalized:{[id: string]: string[]};

  constructor() {
    this.map = new RouterNode();
    this.mapped = {};
    this.normalized = {};
  }

  add(url:string, app:Function):boolean {
    if (this.isExist(url)) {
      return false;
    }

    let normalized = this.normalize(url);
    let now = this.map;
    let routeNames = normalized[0].split('/');

    _.each(routeNames, (name:string)=> {
      if (name === '') {
        return;
      }
      now = now.findOrCreate(name);
    });

    now.app = app;
    now.parameters = normalized[1].split(':');
    return this.mapped[normalized[0]] = true;
  }

  execute(url:string):any {
    let store = [];
    let now:RouterNode = this.map;
    let ref:string[] = Router.strip(url).split('/');

    _.each(ref, (name:string)=> {
      if (now.find(name)) {
        now = now.find(name);
      } else if (now.find(':')) {
        store.push(name);
        now = now.find(':');
      }
    });

    let params = {};
    let paramNames = now.parameters;
    _.each(paramNames, (name:string, index:number)=> {
      params[name] = store[index];
    });

    return now.app(params);
  }

  static isIncludePlaceholder(url:string):boolean {
    return url.match(/:[a-z_0-9]+/) != null;
  };

  static strip(url:string):string {
    return url.replace(/\/$/ig, '').replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.*/, '');
  };

  isExist(url:string):boolean{
    return this.find(url) != undefined;
  }

  private find(url:string) {
    var normalized = this.normalize(url);
    return this.mapped[normalized[0]];
  };

  private normalize(url):string[] {
    if (this.normalized[url]) {
      return this.normalized[url];
    }
    if (!Router.isIncludePlaceholder(url)) {
      return this.normalized[url] = [Router.strip(url), ''];
    }
    return this.normalized[url] = this.pickHolder(url, []);
  };

  private pickHolder(url:string, holders:string[]):string[] {
    let result:RegExpMatchArray = url.match(/(:[a-z_0-9]+)/);
    if (!result) {
      return [Router.strip(url), holders.join(':')];
    }
    return this.pickHolder(url.replace(result[1], ':'), holders.concat(result[1].replace(':', '')));
  };
}