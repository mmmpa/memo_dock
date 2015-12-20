import TagData from "./tag-data";

export default class MemoData {
  public id:number;
  public title:string = '';
  public isPublic:boolean = false;
  public tags:TagData[] = [];
  public tagList:string = '';
  public src:string = '';

  constructor(json:any = null) {
    if (!json) {
      return;
    }
    this.id = +json['id'];
    this.title = json['title'];
    this.src = json['src'];
    this.isPublic = json['public'];
    this.tags = json['tags'].map((tag)=> new TagData(tag));
    this.tagList = this.tags.map((tag)=> tag.name).join(', ');
  }

  isPersisted(){
    return this.id !== undefined;
  }

  generateParams() {
    var params:any = {}
    params['id'] = this.id;
    params['title'] = this.title;
    params['src'] = this.src;
    params['public'] = this.isPublic;
    params['tag_list'] = this.tagList;
    return params;
  }
}