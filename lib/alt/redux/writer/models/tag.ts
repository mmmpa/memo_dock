export default class Tag {
  public id:number;
  public name:string;

  constructor(json) {
    this.id = +json['id'];
    this.name = json['name'];
  }
}