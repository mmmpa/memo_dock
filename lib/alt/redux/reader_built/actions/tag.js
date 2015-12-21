var Type = require('../constants/action-types');
function index(tagIds) {
    if (tagIds === void 0) { tagIds = ''; }
    return { type: Type.Tag.Index };
}
exports.index = index;
//# sourceMappingURL=tag.js.map