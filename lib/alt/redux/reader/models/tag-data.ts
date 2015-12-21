export default class TagData {
  public id:number;
  public name:string;

  constructor(json) {
    this.id = +json['id'];
    this.name = json['name'];
  }
}