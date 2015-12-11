import * as Type from '../action-types'

export function requestLogin() {
  return {type: Type.REQUEST_LOGIN};
}

export function tryLogin(email:string, password:string) {
  return (dispatch) => {
    dispatch(login());
  };
}

export function login() {
  console.log('login action')
  return {type: Type.LOGIN};
}

export function logout() {
  return {type: Type.LOGOUT};
}
