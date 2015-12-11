/// <reference path="../types/tsd.d.ts" />
var Type = require('../action-types');
function loggedIn(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case Type.LOGIN:
            return true;
        case Type.LOGOUT:
            return false;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { loggedIn: loggedIn };
//# sourceMappingURL=login.js.map