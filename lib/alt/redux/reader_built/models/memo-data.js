var tag_data_1 = require("./tag-data");
var MemoData = (function () {
    function MemoData(json) {
        if (json === void 0) { json = null; }
        this.title = '';
        this.html = '';
        this.tags = [];
        this.tagList = '';
        this.update = '';
        if (!json) {
            return;
        }
        this.id = +json['id'];
        this.title = json['title'];
        this.html = json['html'];
        this.update = json['updated_at'];
        if (json['tags']) {
            this.tags = json['tags'].map(function (tag) { return new tag_data_1.default(tag); });
            this.tagList = this.tags.map(function (tag) { return tag.name; }).join(', ');
        }
    }
    return MemoData;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoData;
//# sourceMappingURL=memo-data.js.map