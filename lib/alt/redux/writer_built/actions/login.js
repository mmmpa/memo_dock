/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var router_1 = require("../router");
var request = require('superagent');
function token() {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
}
exports.token = token;
function displayForm() {
    return { type: Type.Login.DisplayForm };
}
function requestLogin(afterLoginUri) {
    if (afterLoginUri === void 0) { afterLoginUri = null; }
    return { type: Type.Login.Request, afterLoginUri: afterLoginUri };
}
exports.requestLogin = requestLogin;
function logout() {
    return function (dispatch) {
        request
            .delete('/w/api/sessions')
            .set('X-CSRF-Token', token())
            .end(function (err, res) {
            if (err) {
            }
            else {
                router_1.default.go('/w');
            }
        });
    };
}
exports.logout = logout;
function logoutFinish() {
    return { type: Type.Login.LoggedOut };
}
exports.logoutFinish = logoutFinish;
function start() {
    return function (dispatch) {
        dispatch(displayForm());
        dispatch(requestLogin('/w/memos'));
    };
}
exports.start = start;
function checkInitialState(callback) {
    return function (dispatch) {
        request
            .get('/w/api/sessions')
            .end(function (err, res) {
            if (err) {
                router_1.default.go('/w');
            }
            else {
                dispatch(login());
                callback();
            }
        });
    };
}
exports.checkInitialState = checkInitialState;
function tryLogin(email, password, callback) {
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
                callback();
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
//# sourceMappingURL=login.js.map