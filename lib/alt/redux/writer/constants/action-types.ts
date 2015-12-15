export enum Login{
  Request = 1,
  RequestRetry = 2,
  Wait = 3,
  LoggedIn = 4,
  LoggedOut = 5
}

export enum Memo{
  Index = 101,
  WaitIndex = 105,
  Edit = 102,
  WaitEdit = 106,
  Rendered = 107,
  Create = 103,
  Delete = 104
}