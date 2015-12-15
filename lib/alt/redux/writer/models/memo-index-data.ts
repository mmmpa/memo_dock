import Memo from "./memo"

export default class MemoIndexData {
  constructor(public memos:Memo[] = [], public page:number = 0, public par:number = 0, public total:number = 0) {
  }

  clone() {
    return new MemoIndexData(this.memos.concat(), this.page, this.par, this.total);
  }
}