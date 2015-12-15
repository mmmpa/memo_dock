import Tag from "./tag";

export default class Memo {
  public id:number;
  public title:string = '';
  public isPublic:boolean = false;
  public tags:Tag[] = [];
  public src:string = '';

  constructor(json:any = null) {
    if(!json){
      return;
    }
    this.id = +json['id'];
    this.title = json['title'];
    this.src = json['src'];
    this.isPublic = json['public'];
    this.tags = json['tags'].map((tag)=> new Tag(tag));
  }
}