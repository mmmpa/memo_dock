import * as Type from '../constants/action-types';
import TagData from "../models/tag-data";
const request = require('superagent');
import * as MemoAction from "./memo"

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    dispatch(selectTag(tagIdNumbers));
    dispatch(MemoAction.index(tagIdNumbers));

    let tagIds:string = tagIdNumbers.length ? tagIdNumbers.join(',') : null;

    request
      .get('/r/api/tags/' + tagIds)
      .end((err, res)=> {
        if (err) {
          console.log(err)
        } else {
          let tags = res.body.map((tag)=> {
            return new TagData(tag);
          });
          dispatch(indexSucceed(tags));
        }
      })
  }
}

function indexSucceed(tags:TagData[] = []) {
  return {type: Type.TAG_INDEX, tags};
}

function selectTag(tagIds:number[] = []) {
  return {type: Type.TAG_SELECT, tagIds};
}