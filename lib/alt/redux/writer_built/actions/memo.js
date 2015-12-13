/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var request = require('superagent');
function getIndex(page) {
    if (page === void 0) { page = 1; }
    return function (dispatch) {
        request
            .get('/w/api/memos')
            .set({ page: page })
            .end(function (err, res) {
            if (err) {
            }
            else {
                dispatch(gotIndex(res.body));
            }
        });
    };
}
exports.getIndex = getIndex;
function gotIndex(value) {
    return { type: Type.Memo.Index, value: value };
}
//# sourceMappingURL=memo.js.map