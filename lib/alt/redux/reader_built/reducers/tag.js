var Type = require('../constants/action-types');
function tags(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.TAG_INDEX:
            return action.tags;
        default:
            return state;
    }
}
function selectedTagIds(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case Type.TAG_SELECT:
            return action.tagIds;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { tags: tags, selectedTagIds: selectedTagIds };
//# sourceMappingURL=tag.js.map