import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import TagData from '../models/tag-data'

function tags(state:TagData[] = [], action) {
  switch (action.type) {
    case Type.TAG_INDEX:
      return action.tags;
    default:
      return state;
  }
}

function selectedTagIds(state:number[] = [], action) {
  switch (action.type) {
    case Type.TAG_SELECT:
      return action.tagIds;
    default:
      return state;
  }
}

export default {tags, selectedTagIds}
