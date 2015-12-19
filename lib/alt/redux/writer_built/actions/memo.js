/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var memo_1 = require("../models/memo");
var login_1 = require("./login");
var request = require('superagent');
//　メモ関係画面遷移
function displayEditor() {
    return { type: Type.Memo.DisplayEditor };
}
function displayIndex() {
    return { type: Type.Memo.DisplayIndex };
}
// メモインデックス取得関係
function loadMemoIndex(tag_ids, page) {
    if (tag_ids === void 0) { tag_ids = ''; }
    if (page === void 0) { page = 1; }
    return function (dispatch) {
        dispatch(displayIndex());
        dispatch(waitLoadedIndex());
        request
            .get('/w/api/memos')
            .query({ page: page, tag_ids: tag_ids })
            .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                dispatch(loadMemoIndexSuccess(res.body, +res.header.page, +res.header.par, +res.header['total-pages'], res.header['tag-ids']));
            }
        });
    };
}
exports.loadMemoIndex = loadMemoIndex;
function loadMemoIndexSuccess(memos, page, par, total, tagIds) {
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
                dispatch(saveMemoSucceed(new memo_1.default(res.body)));
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
// メモ編集画面
function waitLoadedMemo() {
    return { type: Type.Memo.WaitEditing };
}
function goEditMemoById(memoId) {
    return function (dispatch) {
        dispatch(displayEditor());
        dispatch(waitLoadedMemo());
        request
            .get('/w/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                dispatch(injectMemoData(new memo_1.default()));
            }
            else {
                dispatch(injectMemoData(new memo_1.default(res.body)));
            }
        });
    };
}
exports.goEditMemoById = goEditMemoById;
function goEditNewMemo() {
    return function (dispatch) {
        dispatch(displayEditor());
        dispatch(injectMemoData(new memo_1.default()));
    };
}
exports.goEditNewMemo = goEditNewMemo;
function injectMemoData(memo) {
    if (memo === void 0) { memo = null; }
    return { type: Type.Memo.StartEditing, memo: memo };
}
function startEditMemo(memo) {
    return goEditMemoById(memo.id);
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