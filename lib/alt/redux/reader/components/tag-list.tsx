import * as React from 'react'

import {TagState} from '../constants/status'
import TagData from "../models/tag-data";

interface ITagList {
  tags:TagData[],
  tagState:TagState,
  height:number
}

export default class TagList extends React.Component<ITagList,{}> {
  render() {
    let {height} = this.props;

    return <section id="tagList" style={{height}} className="tag-list tag-list-container">tags</section>
  }
}