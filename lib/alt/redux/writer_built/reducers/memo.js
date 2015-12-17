/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var _ = require('lodash');
var memo_1 = require('../models/memo');
var memo_index_data_1 = require("../models/memo-index-data");
var status_1 = require('../constants/status');
function memoIndexData(state, action) {
    if (state === void 0) { state = new memo_index_data_1.default(); }
    switch (action.type) {
        case Type.Memo.ShowIndex:
            var memos = action.memos, page = action.page, par = action.par, total = action.total;
            var ms = _.map(memos, function (memo) { return new memo_1.default(memo); });
            return new memo_index_data_1.default(ms, page, par, total);
        case Type.Memo.WaitIndex:
            if (!state) {
                return state;
            }
            var newData = state.clone();
            newData.memos = [];
            return newData;
        default:
            return state;
    }
}
function memoData(state, action) {
    if (state === void 0) { state = new memo_1.default(); }
    switch (action.type) {
        case Type.Memo.StartEditing:
            return action.memo;
        case Type.Memo.SuccessSaving:
            return action.memo;
        default:
            return state;
    }
}
function rendered(state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
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
        case Type.Memo.SuccessSaving:
            return status_1.EditMemoState.Ready;
        case Type.Memo.FailSaving:
            return status_1.EditMemoState.Ready;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memoIndexData: memoIndexData, memoData: memoData, rendered: rendered, editState: editState };
//# sourceMappingURL=memo.js.map