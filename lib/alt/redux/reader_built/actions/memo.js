var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var request = require('superagent');
function show(memoId) {
    return function (dispatch) {
        request
            .get('/r/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                dispatch(showSucceed(new memo_data_1.default(res.body)));
            }
        });
    };
}
exports.show = show;
function showSucceed(memo) {
    return { type: Type.Memo.Show, memo: memo };
}
function remove() {
    return { type: Type.Memo.Remove };
}
exports.remove = remove;
function index(tagIdNumbers) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    return function (dispatch) {
        var tagIds = tagIdNumbers.join(',');
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
                dispatch(indexSucceed(memos));
            }
        });
    };
}
exports.index = index;
function indexSucceed(memos) {
    if (memos === void 0) { memos = []; }
    return { type: Type.Memo.Index, memos: memos };
}
//# sourceMappingURL=memo.js.map