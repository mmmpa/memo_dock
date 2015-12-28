import * as Type from '../constants/action-types';
import TagData from "../models/tag-data";
const request = require('superagent');
import * as MemoAction from "./memo"

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    dispatch(selectTag(tagIdNumbers));
    dispatch(MemoAction.index(tagIdNumbers));

    let tagIds:string = tagIdNumbers.length
      ? encodeURIComponent(tagIdNumbers.join(','))
      : '';

    request
      .get('/r/api/tags/' + tagIds)
      .end((err, res)=> {
        if (err) {
          dispatch(indexSupport([new TagData({name: 'error', id: 0})]));
        } else {
          let tags = res.body.map((tag)=> {
            return new TagData(tag);
          });
          dispatch(indexSupport(tags));
        }
      })
  }
}

function indexSupport(tags:TagData[]) {
  return {type: Type.TAG_INDEX, tags};
}

function selectTag(tagIds:number[]) {
  return {type: Type.TAG_SELECT, tagIds};
}