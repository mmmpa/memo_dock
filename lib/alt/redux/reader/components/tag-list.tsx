import * as _ from 'lodash'
import * as React from 'react'

import {TagWork} from "../mixins";

import {TagState} from '../constants/status'
import TagData from "../models/tag-data";

interface ITagList {
  tags:TagData[],
  tagState:TagState,
  selecedTagIds:number[],
  height:number
}

export default class TagList extends React.Component<ITagList,{}> {
  isSelected(id:number) {
    return _.include(this.props.selecedTagIds, id);
  }

  toggle(id) {
    TagWork.index(this.generateNextTagIds(id));
  }

  generateNextTagIds(id):number[] {
    let {selecedTagIds} = this.props;
    if (this.isSelected(id)) {
      return _.without(selecedTagIds, id);
    } else {
      let ids = selecedTagIds.concat();
      ids.push(id)
      return ids;
    }
  }

  writeTagList() {
    let {tags} =  this.props;

    return tags.map((tag:TagData)=> {
      return <li key={'memo' + tag.id}>
        <label>
          <input type="checkbox" checked={this.isSelected(tag.id)} onChange={()=> this.toggle(tag.id)}/>
          {tag.name}
        </label>
      </li>
    });
  }

  render() {
    let {height} = this.props;

    return <section id="tagList" style={{height}} className="tag-list tag-list-container">
      <ul className="tag-list list">
        {this.writeTagList()}
      </ul>
    </section>
  }
}