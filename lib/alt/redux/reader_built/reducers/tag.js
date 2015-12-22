var Type = require('../constants/action-types');
var status_1 = require('../constants/status');
function tags(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.Tag.Index:
            return action.tags;
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
function selecedTagIds(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.Tag.Select:
            return action.tagIds;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { tags: tags, tagState: tagState, selecedTagIds: selecedTagIds };
//# sourceMappingURL=tag.js.map