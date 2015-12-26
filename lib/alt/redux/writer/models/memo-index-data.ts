import MemoData from "./memo-data"

export default class MemoIndexData {
  constructor(public memos:MemoData[] = [], public page:number = 0, public par:number = 0, public total:number = 0, public tagIds:string = '') {
    if(tagIds === ''){
      this.tagIds = null
    }

    this.isSelectedTag = this.isSelectedTag.bind(this)
  }

  isSelectedTag():boolean{
    return this.tagIds !== null;
  }

  clone() {
    return new MemoIndexData(this.memos.concat(), this.page, this.par, this.total, this.tagIds);
  }
}