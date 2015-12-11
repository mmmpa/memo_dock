var Type = require('../action-types');
function requestLogin() {
    return { type: Type.REQUEST_LOGIN };
}
exports.requestLogin = requestLogin;
function tryLogin(email, password) {
    return function (dispatch) {
        dispatch(login());
    };
}
exports.tryLogin = tryLogin;
function login() {
    console.log('login action');
    return { type: Type.LOGIN };
}
exports.login = login;
function logout() {
    return { type: Type.LOGOUT };
}
exports.logout = logout;
//# sourceMappingURL=login.js.map