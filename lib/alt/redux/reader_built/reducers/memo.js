var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
var memo_data_1 = require('../models/memo-data');
function memo(state, action) {
    if (state === void 0) { state = new memo_data_1.default(); }
    switch (action.type) {
        case Type.Memo.Remove:
            return new memo_data_1.default();
        case Type.Memo.Show:
            return action.memo;
        default:
            return state;
    }
}
function titles(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.Memo.Index:
            return action.memos;
        default:
            return state;
    }
}
function memoState(state, action) {
    if (state === void 0) { state = status_1.MemoState.Ready; }
    switch (action.type) {
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memo: memo, titles: titles, memoState: memoState };
//# sourceMappingURL=memo.js.map