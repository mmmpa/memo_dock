import Memo from "./memo"

export default class MemoIndexData {
  constructor(public memos:Memo[], public page:number, public par:number, public total:number) {
  }
}