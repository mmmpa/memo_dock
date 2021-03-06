/// <reference path="../types/tsd.d.ts" />
var _ = require('lodash');
var redux_1 = require('redux');
var memo_1 = require('./memo');
var tag_1 = require('./tag');
var redux_router_1 = require('redux-router');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers(_.assign({}, memo_1.default, tag_1.default, { router: redux_router_1.routerStateReducer }));
//# sourceMappingURL=reducers.js.map