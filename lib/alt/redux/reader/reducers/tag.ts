import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import {TagState} from '../constants/status'
import TagData from '../models/tag-data'

function tags(state:TagData[] = [], action) {
  switch (action.type) {
    case Type.TAG_INDEX:
      return action.tags;
    default:
      return state;
  }
}

function tagState(state:TagState = TagState.Ready, action) {
  switch (action.type) {
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

export default {tags, tagState, selectedTagIds}
