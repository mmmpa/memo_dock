
export class AppState{
  static login:LoginState;
  static edit:EditMemoState;
  static index:MemoIndexState;
}

export enum LoginState{
  Ready = 101,
  Request = 102,
  Wait = 103,
  Invalid = 104,
  LoggedIn = 105
}

export enum Context{
  Login = 1,
  MemoEdit = 2,
  MemoIndex = 3,
  Calm = 0
}

export enum EditMemoState{
  Ready,
  Loading,
  Saving,
}

export enum MemoIndexState{
  Ready,
  Wait
}
