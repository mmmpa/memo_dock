import MemoData from "./models/memo-data";

export class MemoWork {
  static nojs:any;

  static setTitle(title:string){
    document.title = title;
  }

  static getPortal(){
    let memo:MemoData = new MemoData();
    try{
      let title:string = this.nojs.getElementsByTagName('h1')[0].innerHTML;
      let html:string = this.nojs.getElementsByTagName('section')[0].innerHTML;
      memo.title = title;
      memo.html = html;
    }catch(e){

    }
    return memo;
  }
}