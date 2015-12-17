/// <reference path="../types/tsd.d.ts" />

import * as React from 'react'
import Memo from "../models/memo";
import * as _ from 'lodash'
import MemoIndexLine from "./memo-index-line";
import Tag from "../models/tag";
import {MemoMix} from "../mixins";

interface IMemoIndexTagLink {
  key:number,
  tag:Tag
}

export default class MemoIndexTagLink extends React.Component<IMemoIndexTagLink, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let {tag} = this.props;
    return (
      <div className="memo-index tag-link-container">
        <a className="memo-index tag-link" onClick={()=> MemoMix.goTaggedIndex(tag)}>{tag.name}</a>
      </div>
    )
  }
}
