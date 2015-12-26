var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
var memo_data_1 = require('../models/memo-data');
function memo(state, action) {
    if (state === void 0) { state = new memo_data_1.default(); }
    switch (action.type) {
        case Type.MEMO_REMOVE:
            return new memo_data_1.default();
        case Type.MEMO_SHOW:
            return action.memo;
        default:
            return state;
    }
}
function titles(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.MEMO_INDEX:
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
function html(state, action) {
    if (state === void 0) { state = null; }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memo: memo, titles: titles, memoState: memoState, html: html };
//# sourceMappingURL=memo.js.map