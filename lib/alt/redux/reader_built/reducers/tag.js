var status_1 = require('../constants/status');
function tags(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        default:
            return state;
    }
}
function tagState(state, action) {
    if (state === void 0) { state = status_1.TagState.Ready; }
    switch (action.type) {
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { tags: tags, tagState: tagState };
//# sourceMappingURL=tag.js.map