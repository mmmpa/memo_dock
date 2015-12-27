var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var request = require('superagent');
function show(memoId) {
    return function (dispatch) {
        request
            .get('/r/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                dispatch(showMemoData(new memo_data_1.default({})));
            }
            else {
                dispatch(showMemoData(new memo_data_1.default(res.body)));
            }
        });
    };
}
exports.show = show;
function showMemoData(memo) {
    return { type: Type.MEMO_SHOW, memo: memo };
}
exports.showMemoData = showMemoData;
function remove() {
    return { type: Type.MEMO_REMOVE };
}
exports.remove = remove;
function index(tagIdNumbers) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    return function (dispatch) {
        var tagIds = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
        request
            .get('/r/api/memos')
            .query({ tag_ids: tagIds })
            .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                var memos = res.body.map(function (memo) {
                    return new memo_data_1.default(memo);
                });
                dispatch(indexSupport(memos));
            }
        });
    };
}
exports.index = index;
function indexSupport(memos) {
    if (memos === void 0) { memos = []; }
    return { type: Type.MEMO_INDEX, memos: memos };
}
//# sourceMappingURL=memo.js.map