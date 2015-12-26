/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function loginState(state, action) {
    if (state === void 0) { state = status_1.LoginState.Request; }
    switch (action.type) {
        case Type.LOGIN_WAIT:
            return status_1.LoginState.Wait;
        case Type.LOGIN_REQUEST:
            return status_1.LoginState.Request;
        case Type.LOGIN_LOGGED_OUT:
            return status_1.LoginState.Request;
        case Type.LOGIN_REQUEST_RETRY:
            return status_1.LoginState.Invalid;
        case Type.LOGIN_LOGGED_IN:
            return status_1.LoginState.LoggedIn;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { loginState: loginState };
//# sourceMappingURL=login.js.map