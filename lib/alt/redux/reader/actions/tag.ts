import * as Type from '../constants/action-types';

export function index(tagIds:string = ''){
  return {type: Type.Tag.Index};
}
