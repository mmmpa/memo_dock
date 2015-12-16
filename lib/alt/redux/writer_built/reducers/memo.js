/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var _ = require('lodash');
var memo_1 = require('../models/memo');
var memo_index_data_1 = require("../models/memo-index-data");
function memoIndexData(state, action) {
    if (state === void 0) { state = new memo_index_data_1.default(); }
    switch (action.type) {
        case Type.Memo.Index:
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
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.Memo.Edit:
            return action.memo;
        default:
            return state;
    }
}
function rendered(state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case Type.Memo.Edit:
            return '';
        case Type.Memo.Rendered:
            return action.html;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memoIndexData: memoIndexData, memoData: memoData, rendered: rendered };
//# sourceMappingURL=memo.js.map