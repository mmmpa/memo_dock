var Type = require('../constants/action-types');
var tag_data_1 = require("../models/tag-data");
var request = require('superagent');
var MemoAction = require("./memo");
function index(tagIdNumbers) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    return function (dispatch) {
        dispatch(selectTag(tagIdNumbers));
        dispatch(MemoAction.index(tagIdNumbers));
        var tagIds = tagIdNumbers.length
            ? encodeURIComponent(tagIdNumbers.join(','))
            : '';
        request
            .get('/r/api/tags/' + tagIds)
            .end(function (err, res) {
            if (err) {
                dispatch(indexSupport([new tag_data_1.default({ name: 'error', id: 0 })]));
            }
            else {
                var tags = res.body.map(function (tag) {
                    return new tag_data_1.default(tag);
                });
                dispatch(indexSupport(tags));
            }
        });
    };
}
exports.index = index;
function indexSupport(tags) {
    return { type: Type.TAG_INDEX, tags: tags };
}
function selectTag(tagIds) {
    return { type: Type.TAG_SELECT, tagIds: tagIds };
}
//# sourceMappingURL=tag.js.map