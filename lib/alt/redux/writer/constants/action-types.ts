export enum Login{
  Request = 1,
  RequestRetry = 2,
  Wait = 3,
  LoggedIn = 4,
  LoggedOut = 5
}

export enum Memo{
  ShowIndex = 101,
  WaitIndex = 105,
  StartEditing = 102,
  WaitEditing = 106,
  FinishRendering = 107,
  Create = 103,
  Delete = 104,
  SuccessSaving = 108,
  FailSaving = 109,
  StartSaving = 110,
}