//
// 表示する画面を決定するstate
//
/// <reference path="../types/tsd.d.ts" />
var Type = require('../action-types');
var Context = require('../contexts');
function context(state, action) {
    if (state === void 0) { state = Context.APP_LOGIN; }
    switch (action.type) {
        case Type.REQUEST_LOGIN:
            return Context.APP_LOGIN;
        case Type.LOGOUT:
            return Context.APP_LOGIN;
        case Type.LOGIN:
            console.log('index');
            return Context.MEMO_INDEX;
        case Type.MEMO_CREATION:
            return Context.MEMO_EDIT;
        case Type.MEMO_EDIT:
            return Context.MEMO_EDIT;
        case Type.MEMO_INDEX:
            return Context.MEMO_INDEX;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { context: context };
//# sourceMappingURL=context.js.map