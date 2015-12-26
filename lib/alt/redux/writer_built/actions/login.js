/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
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
function logOut(succeed, fail) {
    if (succeed === void 0) { succeed = null; }
    if (fail === void 0) { fail = null; }
    return function (dispatch) {
        request
            .delete('/w/api/sessions')
            .set('X-CSRF-Token', token())
            .end(function (err, res) {
            if (err) {
                fail && fail();
            }
            else {
                dispatch(setRequest());
                succeed && succeed();
            }
        });
    };
}
exports.logOut = logOut;
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
function checkInitialState(succeed, fail) {
    if (succeed === void 0) { succeed = null; }
    if (fail === void 0) { fail = null; }
    return function (dispatch) {
        request
            .get('/w/api/sessions')
            .end(function (err, res) {
            if (err) {
                dispatch(setRequest());
                fail && fail();
            }
            else {
                dispatch(setLoggedIn());
                succeed && succeed();
            }
        });
    };
}
exports.checkInitialState = checkInitialState;
function setRequest() {
    return { type: Type.Login.Request };
}
function setLoggedIn() {
    return { type: Type.Login.LoggedIn };
}
function login(email, password, succeed, fail) {
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
                fail && fail();
            }
            else {
                dispatch(setLoggedIn());
                succeed && succeed();
            }
        });
    };
}
exports.login = login;
function waitLogin() {
    return { type: Type.Login.Wait };
}
exports.waitLogin = waitLogin;
function requestRetryLogin() {
    return { type: Type.Login.RequestRetry };
}
exports.requestRetryLogin = requestRetryLogin;
//# sourceMappingURL=login.js.map