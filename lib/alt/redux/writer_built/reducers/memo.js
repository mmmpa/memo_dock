/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var _ = require('lodash');
var memo_1 = require('../models/memo');
function memos(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.Memo.Index:
            return _.map(action.value, function (memo) { return new memo_1.default(memo); });
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { memos: memos };
//# sourceMappingURL=memo.js.map