/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function loginState(state, action) {
    if (state === void 0) { state = status_1.LoginState.Ready; }
    switch (action.type) {
        case Type.Login.Wait:
            return status_1.LoginState.Wait;
        case Type.Login.Request:
            return status_1.LoginState.Request;
        case Type.Login.LoggedOut:
            return status_1.LoginState.Request;
        case Type.Login.RequestRetry:
            return status_1.LoginState.Invalid;
        case Type.Login.LoggedIn:
            return status_1.LoginState.LoggedIn;
        default:
            return state;
    }
}
function afterLoginUri(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.Login.Request:
            return action.afterLoginUri;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { loginState: loginState, afterLoginUri: afterLoginUri };
//# sourceMappingURL=login.js.map