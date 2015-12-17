/// <reference path="../types/tsd.d.ts" />
var Type = require('../constants/action-types');
var memo_1 = require("../models/memo");
var login_1 = require("./login");
var request = require('superagent');
function getIndex(page) {
    if (page === void 0) { page = 1; }
    return function (dispatch) {
        dispatch(waitLoadedIndex());
        request
            .get('/w/api/memos')
            .query({ page: page })
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
function updateMemo(memo) {
    if (memo.isPersisted()) {
        return function (dispatch) {
            request
                .patch('/w/api/memos/' + memo.id)
                .set('X-CSRF-Token', login_1.token())
                .send({ memo: memo.generateParams() })
                .end(function (err, res) {
                if (err) {
                    dispatch(updateMemoFailed(res.body));
                }
                else {
                    console.log(res.body);
                    dispatch(updateMemoAfter(new memo_1.default(res.body)));
                }
            });
        };
    }
    else {
        return function (dispatch) {
            request
                .post('/w/api/memos/new')
                .set('X-CSRF-Token', login_1.token())
                .send({ memo: memo.generateParams() })
                .end(function (err, res) {
                if (err) {
                    dispatch(updateMemoFailed(res.body));
                }
                else {
                    dispatch(updateMemoAfter(new memo_1.default(res.body)));
                }
            });
        };
    }
}
exports.updateMemo = updateMemo;
function updateMemoFailed(errors) {
    return { type: Type.Memo.FailedCreation, errors: errors };
}
function updateMemoAfter(memo) {
    return { type: Type.Memo.Created, memo: memo };
}
function waitLoadedIndex() {
    return { type: Type.Memo.WaitIndex };
}
function gotIndex(memos, page, par, total) {
    return { type: Type.Memo.Index, memos: memos, page: page, par: par, total: total };
}
function goEditMemo(memo) {
    if (memo === void 0) { memo = null; }
    return { type: Type.Memo.Edit, memo: memo };
}
function waitLoadedMemo() {
    return { type: Type.Memo.WaitEdit };
}
function editNewMemo() {
    goEditMemo(new memo_1.default());
}
exports.editNewMemo = editNewMemo;
function editMemoById(memoId) {
    return function (dispatch) {
        dispatch(waitLoadedMemo());
        request
            .get('/w/api/memos/' + memoId)
            .end(function (err, res) {
            if (err) {
                dispatch(goEditMemo(new memo_1.default()));
            }
            else {
                dispatch(goEditMemo(new memo_1.default(res.body)));
            }
        });
    };
}
exports.editMemoById = editMemoById;
function editMemo(memo) {
    return editMemoById(memo.id);
}
exports.editMemo = editMemo;
function renderSlim(slim) {
    return function (dispatch) {
        request
            .post('/w/api/memos/slim')
            .set('X-CSRF-Token', login_1.token())
            .send({ slim: slim })
            .end(function (err, res) {
            if (err) {
                dispatch(renderedSlim('書式が不正です'));
            }
            else {
                dispatch(renderedSlim(res.body.html));
            }
        });
    };
}
exports.renderSlim = renderSlim;
function renderedSlim(html) {
    return { type: Type.Memo.Rendered, html: html };
}
exports.renderedSlim = renderedSlim;
//# sourceMappingURL=memo.js.map