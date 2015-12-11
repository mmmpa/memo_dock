/// <reference path="../types/tsd.d.ts" />
var _ = require('lodash');
var redux_1 = require('redux');
var login_1 = require('./login');
var memo_1 = require('./memo');
var context_1 = require('./context');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers(_.assign({}, login_1.default, memo_1.default, context_1.default));
//# sourceMappingURL=reducers.js.map