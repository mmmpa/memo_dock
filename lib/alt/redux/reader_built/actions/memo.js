var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var request = require('superagent');
var router_1 = require("../router");
function show(memoId) {
    return function (dispatch) {
        router_1.default.go('/memo/' + memoId + router_1.default.pickQueryString(), true, false);
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
    return { type: Type.MEMO_SHOW, memo: memo };
}
function remove() {
    return { type: Type.MEMO_REMOVE };
}
exports.remove = remove;
function index(tagIdNumbers) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    return function (dispatch) {
        var tagIds = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
        router_1.default.go(router_1.default.pickPath() + router_1.default.buildQueryString({ tagIds: tagIds }), true, false);
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
    return { type: Type.MEMO_INDEX, memos: memos };
}
//# sourceMappingURL=memo.js.map