/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var Status = require('../constants/status');
function loggedIn(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case Type.Login.LoggedIn:
            return true;
        case Type.Login.LoggedOut:
            return false;
        default:
            return state;
    }
}
function loginState(state, action) {
    if (state === void 0) { state = Status.Login.Ready; }
    switch (action.type) {
        case Type.Login.Wait:
            return Status.Login.Wait;
        case Type.Login.Request:
            return Status.Login.Request;
        case Type.Login.RequestRetry:
            return Status.Login.Invalid;
        case Type.Login.LoggedIn:
            return Status.Login.LoggedIn;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { loggedIn: loggedIn, loginState: loginState };
//# sourceMappingURL=login.js.map