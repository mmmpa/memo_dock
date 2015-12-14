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
                dispatch(gotIndex(res.body, +res.header.page, +res.header.par, +res.header['total-pages']));
            }
        });
    };
}
exports.getIndex = getIndex;
function gotIndex(memos, page, par, total) {
    return { type: Type.Memo.Index, memos: memos, page: page, par: par, total: total };
}
//# sourceMappingURL=memo.js.map