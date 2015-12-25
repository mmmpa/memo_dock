/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var memo_data_1 = require("../models/memo-data");
var login_1 = require("./login");
var request = require('superagent');
function checkLogin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return login_1.checkInitialState.apply(void 0, args);
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
            }
            else {
                dispatch(showIndex(res.body, +res.header.page, +res.header.par, +res.header['total-pages'], res.header['tag-ids']));
            }
        });
    };
}
exports.index = index;
function loadTaggedIndex(tag) {
    return index(tag.id.toString());
}
exports.loadTaggedIndex = loadTaggedIndex;
function showIndex(memos, page, par, total, tagIds) {
    return { type: Type.Memo.ShowIndex, memos: memos, page: page, par: par, total: total, tagIds: tagIds };
}
function waitLoadedIndex() {
    return { type: Type.Memo.WaitIndex };
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
    return { type: Type.Memo.StartSaving };
}
function saveMemoFail(errors) {
    return { type: Type.Memo.FailSaving, errors: errors };
}
function saveMemoSucceed(memo) {
    return { type: Type.Memo.SucceedSaving, memo: memo };
}
function deleteMemo(memo) {
    return function (dispatch) {
        dispatch(tryDeleteMemo(memo, function () { return null; }));
    };
}
exports.deleteMemo = deleteMemo;
function tryDeleteMemo(memo, callback) {
    return function (dispatch) {
        dispatch(waitLoadedIndex());
        request
            .delete('/w/api/memos/' + memo.id)
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
exports.tryDeleteMemo = tryDeleteMemo;
// メモ編集画面
function waitLoadedMemo() {
    return { type: Type.Memo.WaitEditing };
}
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
function editNewMemo() {
    return function (dispatch) {
        dispatch(injectMemoData(new memo_data_1.default()));
    };
}
exports.editNewMemo = editNewMemo;
function injectMemoData(memo) {
    if (memo === void 0) { memo = null; }
    return { type: Type.Memo.StartEditing, memo: memo };
}
function startEditMemo(memo) {
    return editMemoById(memo.id);
}
exports.startEditMemo = startEditMemo;
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
    return { type: Type.Memo.FinishRendering, html: html };
}
exports.renderSlimFinish = renderSlimFinish;
//# sourceMappingURL=memo.js.map