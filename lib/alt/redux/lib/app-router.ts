import RouterBase from './router'
import * as _ from 'lodash'

export default class AppRouter {
  static dispatch:Function;
  static router:RouterBase = new RouterBase();

  static go(url:string, doRecord:boolean = true, doExecute:boolean = true):any {
    document.getElementById('canonical').setAttribute('href', this.rootPath() + url.replace(/\?.*/, ''));

    if (doRecord) {
      history.pushState({}, null, url);
    }
    if(doExecute){
      return this.router.execute(url);
    }
  }

  static goHere(isRecord:boolean = true):any {
    return this.go(this.strippedPath(), isRecord);
  }

  static rootPath():string{
    return location.href.match(/.+?:\/\/(.+?)\//)[0].replace(/\/$/,'');
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }

  static pickQueryString():string {
    let result = location.href.match(/\?.+/);
    return result ? result[0] : '';
  }

  static pickPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
  }

  static buildQueryString(hash:any):string {
    let result:string[] = [];
    _.pairs(hash).map((kv)=> {
      if (kv[1]) {
        result.push(kv.join('='))
      }
    });
    if (!result.length) {
      return '';
    }
    return '?' + result.join('&');
  }
}