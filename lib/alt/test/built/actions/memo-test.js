/// <reference path="../src/types/tsd.d.ts" />
var _ = require('lodash');
var assert = require('power-assert');
var MemoAction = require('../src/actions/memo');
var memo_data_1 = require("../src/models/memo-data");
var Type = require('../src/constants/action-types');
describe("MemoAction", function () {
    context("show", function () {
        it("show return a function", function () {
            assert.equal(_.isFunction(MemoAction.show(1)), true);
        });
        it("showMemoData return an object", function () {
            var memo = new memo_data_1.default();
            assert.deepEqual(MemoAction.showMemoData(memo), { type: Type.MEMO_SHOW, memo: memo });
        });
    });
    context('index', function () {
        it("index return a function", function () {
            assert.equal(_.isFunction(MemoAction.index()), true);
        });
    });
});
//# sourceMappingURL=memo-test.js.map