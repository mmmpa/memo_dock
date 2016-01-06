/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var login_1 = require("./login");
var memo_index_data_1 = require("../models/memo-index-data");
var request = require('superagent');
function checkLogin(succeed, fail) {
    if (succeed === void 0) { succeed = null; }
    if (fail === void 0) { fail = null; }
    return login_1.checkInitialState(succeed, fail);
}
exports.checkLogin = checkLogin;
// メモインデックス取得関係
function index(tagIdNumbers, page) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    if (page === void 0) { page = 1; }
    return function (dispatch) {
        var tag_ids = tagIdNumbers.length ? tagIdNumbers.join(',') : null;
        dispatch(waitLoadedIndex());
        request
            .get('/w/api/memos')
            .query({ page: page, tag_ids: tag_ids })
            .end(function (err, res) {
            if (err) {
                dispatch(failIndexLoad());
            }
            else {
                dispatch(showIndex(new memo_index_data_1.default(res.body, res.header)));
            }
        });
    };
}
exports.index = index;
function failIndexLoad() {
    return { type: Type.MEMO_SHOW_INDEX_RETRY };
}
function showIndex(indexData) {
    return { type: Type.MEMO_SHOW_INDEX, indexData: indexData };
}
function waitLoadedIndex() {
    return { type: Type.MEMO_WAIT_INDEX };
}
// メモ保存関係
function saveMemo(memo) {
    var requester = memo.isPersisted()
        ? request.patch('/w/api/memos/' + memo.id)
        : request.post('/w/api/memos/new');
    return function (dispatch) {
        dispatch(saveMemoStart());
        requester
            .set('X-CSRF-Token', login_1.token())
            .send({ memo: memo.generateParams() })
            .end(function (err, res) {
            if (err) {
                dispatch(saveMemoFail(res.body));
            }
            else {
                dispatch(saveMemoSucceed(new memo_data_1.default(res.body)));
            }
        });
    };
}
exports.saveMemo = saveMemo;
function saveMemoStart() {
    return { type: Type.MEMO_START_SAVING };
}
function saveMemoFail(errors) {
    return { type: Type.MEMO_FAIL_SAVING, errors: errors };
}
function saveMemoSucceed(memo) {
    return { type: Type.MEMO_SUCCEED_SAVING, memo: memo };
}
function deleteMemo(memoId, callback) {
    return function (dispatch) {
        dispatch(waitLoadedIndex());
        request
            .delete('/w/api/memos/' + memoId)
            .set('X-CSRF-Token', login_1.token())
            .end(function (err, res) {
            if (err) {
                callback();
            }
            else {
                callback();
            }
        });
    };
}
exports.deleteMemo = deleteMemo;
// メモ編集画面
function editNewMemo() {
    var memo = new memo_data_1.default();
    return { type: Type.MEMO_START_EDITING, memo: memo };
}
exports.editNewMemo = editNewMemo;
function editMemoById(memoId) {
    return function (dispatch) {
        dispatch(waitLoadedMemo());
        request
            .get('/w/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                dispatch(injectMemoData(new memo_data_1.default()));
            }
            else {
                dispatch(injectMemoData(new memo_data_1.default(res.body)));
            }
        });
    };
}
exports.editMemoById = editMemoById;
function waitLoadedMemo() {
    return { type: Type.MEMO_WAIT_EDITING };
}
function injectMemoData(memo) {
    if (memo === void 0) { memo = null; }
    return { type: Type.MEMO_EDIT_NEW_MEMO, memo: memo };
}
// slimのリアルタイムレンダリング
function renderSlim(slim) {
    return function (dispatch) {
        request
            .post('/w/api/memos/slim')
            .set('X-CSRF-Token', login_1.token())
            .send({ slim: slim })
            .end(function (err, res) {
            if (err) {
                dispatch(renderSlimFinish('書式が不正です'));
            }
            else {
                dispatch(renderSlimFinish(res.body.html));
            }
        });
    };
}
exports.renderSlim = renderSlim;
function renderSlimFinish(html) {
    return { type: Type.MEMO_FINISH_RENDERING, html: html };
}
exports.renderSlimFinish = renderSlimFinish;
//# sourceMappingURL=memo.js.map