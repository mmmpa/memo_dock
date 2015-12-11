import Router from './lib/router';

export default class WriterRouter {
  private router:Router;

  constructor() {
    this.router = new Router();
    // メモ一覧を取得
    this.router.add('/w/memos', (params) => console.log('メモ一覧を取得'));
    // メモの内容を取得
    this.router.add('/w/memos/:memo_id', (params) => console.log('メモの内容を取得'));
  }

  go(url:string):any {
    return this.router.execute(url);
  }

  goHere():any {
    return this.go(WriterRouter.strippedPath());
  }

  static strippedPath():string {
    return location.href.replace(/.+?:\/\/(.+?)\//, '/');
  }
}