//
// どの画面を使うかのみを決定する。
//
/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function context(state, action) {
    if (state === void 0) { state = status_1.Context.Calm; }
    switch (action.type) {
        case Type.Login.DisplayForm:
            return status_1.Context.Login;
        case Type.Memo.DisplayEditor:
            return status_1.Context.MemoEdit;
        case Type.Memo.DisplayIndex:
            return status_1.Context.MemoIndex;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { context: context };
//# sourceMappingURL=context.js.map