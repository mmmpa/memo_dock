var redux_1 = require('redux');
var redux_router_1 = require('redux-router');
var createHistory = require('history/lib/createBrowserHistory');
var routes_1 = require('../routes');
var thunk = require('redux-thunk');
//import api from '../middleware/api'
var reducers_1 = require('../reducers/reducers');
var finalCreateStore = redux_1.compose(redux_1.applyMiddleware(thunk), redux_router_1.reduxReactRouter({ routes: routes_1.default, createHistory: createHistory }))(redux_1.createStore);
function configureStore(initialState) {
    return finalCreateStore(reducers_1.default, initialState);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=configure-store.js.map