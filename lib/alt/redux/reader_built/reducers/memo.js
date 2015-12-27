var Type = require('../constants/action-types');
function memo(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.MEMO_REMOVE:
            return null;
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
function html(state, action) {
    if (state === void 0) { state = null; }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memo: memo, titles: titles, html: html };
//# sourceMappingURL=memo.js.map