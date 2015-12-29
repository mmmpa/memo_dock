import * as _ from 'lodash'
import * as React from 'react'

import TagData from "../models/tag-data";

interface ITagList {
  tags:TagData[],
  selectedTagIds:number[],
  windowHeight:number,
  app:any
}

export default class TagList extends React.Component<ITagList,{}> {
  isSelected(id:number) {
    return _.include(this.props.selectedTagIds, id);
  }

  toggle(id) {
    this.props.app.selectTag(this.generateNextTagIds(id));
  }

  generateNextTagIds(id):number[] {
    let {selectedTagIds} = this.props;
    if (this.isSelected(id)) {
      return _.without(selectedTagIds, id);
    } else {
      let ids = selectedTagIds.concat();
      ids.push(id)
      return ids;
    }
  }

  writeTagList() {
    let {tags} =  this.props;

    return tags.map((tag:TagData)=> {
      return <li key={'memo' + tag.id}>
        <label>
          <span className="check">
            <input type="checkbox" checked={this.isSelected(tag.id)} value={tag.id} onChange={()=> this.toggle(tag.id)}/>
          </span>
          <span className="text">{tag.name}</span>
        </label>
      </li>
    });
  }

  render() {
    let {windowHeight} = this.props;

    return <section id="tagList" style={{height: windowHeight}} className="tag-list tag-list-container">
      <ul className="tag-list list">
        {this.writeTagList()}
      </ul>
    </section>
  }
}