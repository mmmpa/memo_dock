import Tag from "./tag";

export default class Memo {
  public id:number;
  public title:string;
  public isPublic:boolean;
  public tags:string[];

  constructor(json:any) {
    this.id = +json['id'];
    this.title = json['title'];
    this.isPublic = json['public'];
    this.tags = json['tags'].map((tag)=> new Tag(tag));
  }
}