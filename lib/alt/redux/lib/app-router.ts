import RouterBase from './router'

export default class AppRouter {
  static dispatch:Function;
  static router:RouterBase = new RouterBase();

  static go(url:string, isRecord:boolean = true):any {
    if (isRecord) {
      history.pushState({}, null, url);
    }
    return this.router.execute(url);
  }

  static goHere(isRecord:boolean = true):any {
    return this.go(this.strippedPath(), isRecord);
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }
}