/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var _ = require('lodash');
var memo_1 = require('../models/memo');
var memo_index_data_1 = require("../models/memo-index-data");
function memoIndexData(state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case Type.Memo.Index:
            var memos = action.memos, page = action.page, par = action.par, total = action.total;
            var ms = _.map(memos, function (memo) { return new memo_1.default(memo); });
            return new memo_index_data_1.default(ms, page, par, total);
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memoIndexData: memoIndexData };
//# sourceMappingURL=memo.js.map