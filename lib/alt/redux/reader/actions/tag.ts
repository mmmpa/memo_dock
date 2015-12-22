import * as Type from '../constants/action-types';
import TagData from "../models/tag-data";
const request = require('superagent');

export function index(tagIdNumbers:number[] = []) {
  return (dispatch) => {
    let tagIds:string = tagIdNumbers.join(',');
    dispatch(selectTag(tagIdNumbers));
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
  return {type: Type.Tag.Index, tags};
}

function selectTag(tagIds:number[] = []) {
  return {type: Type.Tag.Select, tagIds};
}