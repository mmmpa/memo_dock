import * as Type from '../constants/action-types'
import * as _ from 'lodash'

import {TagState} from '../constants/status'
import TagData from '../models/tag-data'

function tags(state:TagData[] = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function tagState(state:TagState = TagState.Ready, action){
  switch(action.type){
    default:
      return state;
  }
}

export default {tags, tagState}
