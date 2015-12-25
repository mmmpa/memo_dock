/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var _ = require('lodash');
var memo_data_1 = require('../models/memo-data');
var memo_index_data_1 = require("../models/memo-index-data");
var status_1 = require('../constants/status');
function memoIndexData(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.Memo.ShowIndex:
            var memos = action.memos, page = action.page, par = action.par, total = action.total, tagIds = action.tagIds;
            var ms = _.map(memos, function (memo) { return new memo_data_1.default(memo); });
            return new memo_index_data_1.default(ms, page, par, total, tagIds);
        default:
            return state;
    }
}
function memoIndexState(state, action) {
    if (state === void 0) { state = status_1.MemoIndexState.Wait; }
    switch (action.type) {
        case Type.Memo.ShowIndex:
            return status_1.MemoIndexState.Ready;
        case Type.Memo.WaitIndex:
            return status_1.MemoIndexState.Wait;
        default:
            return state;
    }
}
function memoData(state, action) {
    if (state === void 0) { state = new memo_data_1.default(); }
    switch (action.type) {
        case Type.Memo.WaitEditing:
            return new memo_data_1.default();
        case Type.Memo.StartEditing:
            return action.memo;
        case Type.Memo.SucceedSaving:
            return action.memo;
        default:
            return state;
    }
}
function memoMessage(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.Memo.StartEditing:
            return null;
        case Type.Memo.WaitEditing:
            return null;
        case Type.Memo.StartSaving:
            return null;
        case Type.Memo.SucceedSaving:
            return { messages: { memo: 'Saved' } };
        case Type.Memo.FailSaving:
            return { errors: action.errors };
        default:
            return state;
    }
}
function rendered(state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case Type.Memo.WaitEditing:
            return '';
        case Type.Memo.StartEditing:
            return '';
        case Type.Memo.FinishRendering:
            return action.html;
        default:
            return state;
    }
}
function editState(state, action) {
    if (state === void 0) { state = status_1.EditMemoState.Ready; }
    switch (action.type) {
        case Type.Memo.WaitEditing:
            return status_1.EditMemoState.Loading;
        case Type.Memo.StartEditing:
            return status_1.EditMemoState.Ready;
        case Type.Memo.StartSaving:
            return status_1.EditMemoState.Saving;
        case Type.Memo.SucceedSaving:
            return status_1.EditMemoState.Ready;
        case Type.Memo.FailSaving:
            return status_1.EditMemoState.Ready;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memoIndexData: memoIndexData, memoData: memoData, rendered: rendered, editState: editState, memoMessage: memoMessage, memoIndexState: memoIndexState };
//# sourceMappingURL=memo.js.map