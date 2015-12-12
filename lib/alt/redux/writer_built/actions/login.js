/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var request = require('superagent');
function token() {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
}
exports.token = token;
function requestLogin() {
    return { type: Type.Login.Request };
}
exports.requestLogin = requestLogin;
function checkInitialState(callback) {
    return function (dispatch) {
        request
            .get('/w/api/sessions')
            .end(function (err, res) {
            if (err) {
                dispatch(requestLogin());
            }
            else {
                dispatch(login());
                callback();
            }
        });
    };
}
exports.checkInitialState = checkInitialState;
function tryLogin(email, password) {
    return function (dispatch) {
        dispatch(waitLogin());
        request
            .post('/w/api/sessions')
            .set('X-CSRF-Token', token())
            .set('Accept', 'application/json')
            .send({ writer_session: { email: email, password: password } })
            .end(function (err, res) {
            if (err) {
                dispatch(requestRetryLogin());
            }
            else {
                dispatch(login());
            }
        });
    };
}
exports.tryLogin = tryLogin;
function waitLogin() {
    return { type: Type.Login.Wait };
}
exports.waitLogin = waitLogin;
function requestRetryLogin() {
    return { type: Type.Login.RequestRetry };
}
exports.requestRetryLogin = requestRetryLogin;
function login() {
    return { type: Type.Login.LoggedIn };
}
exports.login = login;
function logout() {
    return { type: Type.Login.LoggedOut };
}
exports.logout = logout;
//# sourceMappingURL=login.js.map