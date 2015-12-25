import AppRouter from './lib/app-router'

export default class Router extends AppRouter {
  static initialize() {
    this.router.add('/w',
      (params) => {
        this.dispatcher.login.start();
      });
    this.router.add('/w/memos',
      (params) => {
        this.dispatcher.memo.loadMemoIndex(params['tagIds'], params['pageNum']);
      });
    this.router.add('/w/memos/new',
      (params) => this.dispatcher.memo.editNewMemo());
    this.router.add('/w/memos/:memoId',
      (params) => this.dispatcher.memo.editMemoById(params['memoId']));
  }
}