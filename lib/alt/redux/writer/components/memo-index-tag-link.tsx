/// <reference path="../types/tsd.d.ts" />

import * as _ from 'lodash'
import * as React from 'react'
import {AppState, MemoIndexState} from '../constants/status'

import MemoData from "../models/memo-data";
import TagData from "../models/tag-data";

import MemoIndexLine from "./memo-index-line";

import {mixChild} from "../components/eventer";

interface IMemoIndexTagLink {
  key:number,
  tagData:TagData,
  isEnable:Function
}

export default class MemoIndexTagLink extends React.Component<IMemoIndexTagLink, {}> {
  dispatch:(event: string, ...args: any[])=> boolean;

  detectLinkEnabled():string {
    return this.props.isEnable() ? 'memo-index tag-link' : 'memo-index tag-link disabled';
  }

  render() {
    let {tagData} = this.props;
    return (
      <div className="memo-index tag-link-container">
        <a className={this.detectLinkEnabled()} onClick={()=> this.dispatch('index:tag', [tagData.id])}>{tagData.name}</a>
      </div>
    )
  }
}

mixChild(MemoIndexTagLink);