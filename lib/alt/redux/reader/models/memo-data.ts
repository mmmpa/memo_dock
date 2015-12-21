import TagData from "./tag-data";

export default class MemoData {
  public id:number;
  public title:string = '';
  public html:string = '';
  public tags:TagData[] = [];
  public tagList:string = '';

  constructor(json:any = null) {
    if (!json) {
      return;
    }
    this.id = +json['id'];
    this.title = json['title'];
    this.html = json['html'];
    if(json['tags']){
      this.tags = json['tags'].map((tag)=> new TagData(tag));
      this.tagList = this.tags.map((tag)=> tag.name).join(', ');
    }
  }
}