//
// 表示する画面を決定するstate
//
/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function context(state, action) {
    if (state === void 0) { state = status_1.Context.Calm; }
    switch (action.type) {
        case Type.Login.LoggedIn:
            return status_1.Context.MemoIndex;
        case Type.Login.Request:
            return status_1.Context.Login;
        case Type.Login.LoggedOut:
            return status_1.Context.Login;
        case Type.Memo.ShowIndex:
            return status_1.Context.MemoIndex;
        case Type.Memo.WaitIndex:
            return status_1.Context.MemoIndex;
        case Type.Memo.WaitEditing:
            return status_1.Context.MemoEdit;
        case Type.Memo.StartEditing:
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