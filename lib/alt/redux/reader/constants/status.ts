export class AppState {
  static tag:TagState;
  static memo:MemoState;
}

export enum TagState{
  Ready,
  Wait
}

export enum MemoState{
  Ready,
  Wait
}
