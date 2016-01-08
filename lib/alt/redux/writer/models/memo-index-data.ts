import MemoData from "./memo-data"

export default class MemoIndexData {
  memos:MemoData[];
  page:number;
  par:number;
  total:number;
  tagIds:string;

  constructor(body:any, header:any) {
    this.memos = body.map((memo)=> new MemoData(memo));

    this.page = +header['page'];
    this.par = +header['par'];
    this.total = +header['total-pages'];
    this.tagIds = header['tag-ids'] || '';

    if(this.tagIds === ''){
      this.tagIds = null
    }

    this.isSelectedTag = this.isSelectedTag.bind(this)
  }

  isSelectedTag():boolean{
    return this.tagIds !== null;
  }

  clone() {
    return this;
  }
}
