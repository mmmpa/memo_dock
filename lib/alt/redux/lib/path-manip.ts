import * as _ from 'lodash'

export function pickQueryString():string {
  let result = location.href.match(/\?.+/);
  return result ? result[0] : '';
}

export function pickPath():string {
  return location.href.replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.+/, '');
}

export function buildQueryString(hash:any):string {
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
