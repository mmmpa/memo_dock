var Type = require('../constants/action-types');
var tag_data_1 = require("../models/tag-data");
var request = require('superagent');
function index(tagIdNumbers) {
    if (tagIdNumbers === void 0) { tagIdNumbers = []; }
    return function (dispatch) {
        var tagIds = tagIdNumbers.join(',');
        dispatch(selectTag(tagIdNumbers));
        request
            .get('/r/api/tags/' + tagIds)
            .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                var tags = res.body.map(function (tag) {
                    return new tag_data_1.default(tag);
                });
                dispatch(indexSucceed(tags));
            }
        });
    };
}
exports.index = index;
function indexSucceed(tags) {
    if (tags === void 0) { tags = []; }
    return { type: Type.Tag.Index, tags: tags };
}
function selectTag(tagIds) {
    if (tagIds === void 0) { tagIds = []; }
    return { type: Type.Tag.Select, tagIds: tagIds };
}
//# sourceMappingURL=tag.js.map