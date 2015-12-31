var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var request = require('superagent');
function show(memoId) {
    return function (dispatch) {
        request
            .get('/r/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                dispatch(showMemoData(new memo_data_1.default({ title: '404', html: '404' })));
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
        console.log('index');
        var query = (function () {
            if (tagIdNumbers.length) {
                var tag_ids = tagIdNumbers.join(',');
                return { tag_ids: tag_ids };
            }
            else {
                return null;
            }
        })();
        request
            .get('/r/api/memos')
            .query(query)
            .end(function (err, res) {
            if (err) {
                dispatch(indexSupport([new memo_data_1.default({ title: 'error', id: 0 })]));
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
    return { type: Type.MEMO_INDEX, memos: memos };
}
//# sourceMappingURL=memo.js.map