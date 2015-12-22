import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import {TagState} from '../constants/status'
import TagData from '../models/tag-data'

function tags(state:TagData[] = [], action) {
  switch (action.type) {
    case Type.Tag.Index:
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

function selecedTagIds(state:number[] = [], action) {
  switch (action.type) {
    case Type.Tag.Select:
      return action.tagIds;
    default:
      return state;
  }
}

export default {tags, tagState, selecedTagIds}
