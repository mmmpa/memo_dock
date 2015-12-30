import * as _ from 'lodash'

export function buildQueryString(hash:any):string {
  let result:string[] = [];
  _.pairs(hash).map((kv)=> {
    if (kv[1]) {
      result.push(kv.map((v)=> encodeURIComponent(v)).join('='));
    }
  });
  if (!result.length) {
    return '';
  }
  return '?' + result.join('&');
}
