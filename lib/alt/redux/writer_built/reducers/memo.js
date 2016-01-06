/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function memoIndexData(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.MEMO_SHOW_INDEX:
            return action.indexData;
        default:
            return state;
    }
}
function memoIndexState(state, action) {
    if (state === void 0) { state = status_1.MemoIndexState.Wait; }
    switch (action.type) {
        case Type.MEMO_SHOW_INDEX:
            return status_1.MemoIndexState.Ready;
        case Type.MEMO_WAIT_INDEX:
            return status_1.MemoIndexState.Wait;
        default:
            return state;
    }
}
function memoData(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.MEMO_EDIT_NEW_MEMO:
            return action.memo;
        case Type.MEMO_START_EDITING:
            return action.memo;
        case Type.MEMO_SUCCEED_SAVING:
            return action.memo;
        default:
            return state;
    }
}
function memoMessage(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.MEMO_START_EDITING:
            return null;
        case Type.MEMO_WAIT_EDITING:
            return null;
        case Type.MEMO_START_SAVING:
            return null;
        case Type.MEMO_SUCCEED_SAVING:
            return { messages: { memo: 'Saved' } };
        case Type.MEMO_FAIL_SAVING:
            return { errors: action.errors };
        default:
            return state;
    }
}
function editState(state, action) {
    if (state === void 0) { state = status_1.EditMemoState.Ready; }
    switch (action.type) {
        case Type.MEMO_WAIT_EDITING:
            return status_1.EditMemoState.Loading;
        case Type.MEMO_EDIT_NEW_MEMO:
            return status_1.EditMemoState.Ready;
        case Type.MEMO_START_EDITING:
            return status_1.EditMemoState.Ready;
        case Type.MEMO_START_SAVING:
            return status_1.EditMemoState.Saving;
        case Type.MEMO_SUCCEED_SAVING:
            return status_1.EditMemoState.Ready;
        case Type.MEMO_FAIL_SAVING:
            return status_1.EditMemoState.Ready;
        default:
            return state;
    }
}
function rendered(state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case Type.MEMO_WAIT_EDITING:
            return '';
        case Type.MEMO_START_EDITING:
            return '';
        case Type.MEMO_FINISH_RENDERING:
            return action.html;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memoIndexData: memoIndexData, memoData: memoData, rendered: rendered, editState: editState, memoMessage: memoMessage, memoIndexState: memoIndexState };
//# sourceMappingURL=memo.js.map