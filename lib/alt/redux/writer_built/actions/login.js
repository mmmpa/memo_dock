/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var request = require('superagent');
var global = require("global");
function token() {
    return global.document.getElementsByName('csrf-token')[0].getAttribute('content');
}
exports.token = token;
function checkInitialState(succeed, fail) {
    if (succeed === void 0) { succeed = null; }
    if (fail === void 0) { fail = null; }
    return function (dispatch) {
        request
            .get('/w/api/sessions')
            .end(function (err, res) {
            if (err) {
                dispatch(requestLogin());
                fail && fail();
            }
            else {
                dispatch(accept());
                succeed && succeed();
            }
        });
    };
}
exports.checkInitialState = checkInitialState;
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
                dispatch(requestLogin());
                succeed && succeed();
            }
        });
    };
}
exports.logOut = logOut;
function requestLogin() {
    return { type: Type.LOGIN_REQUEST };
}
function accept() {
    return { type: Type.LOGIN_LOGGED_IN };
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
                dispatch(accept());
                succeed && succeed();
            }
        });
    };
}
exports.login = login;
function waitLogin() {
    return { type: Type.LOGIN_WAIT };
}
exports.waitLogin = waitLogin;
function requestRetryLogin() {
    return { type: Type.LOGIN_REQUEST_RETRY };
}
exports.requestRetryLogin = requestRetryLogin;
//# sourceMappingURL=login.js.map