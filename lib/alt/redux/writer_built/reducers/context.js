//
// 表示する画面を決定するstate
//
/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function context(state, action) {
    if (state === void 0) { state = status_1.Context.Login; }
    switch (action.type) {
        case Type.Login.LoggedIn:
            return status_1.Context.MemoIndex;
        case Type.Login.LoggedOut:
            return status_1.Context.Login;
        case Type.Memo.Index:
            return status_1.Context.MemoIndex;
        case Type.Memo.Edit:
            return status_1.Context.MemoEdit;
        case Type.Memo.Create:
            return status_1.Context.MemoEdit;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { context: context };
//# sourceMappingURL=context.js.map