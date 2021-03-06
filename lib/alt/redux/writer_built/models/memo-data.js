var tag_data_1 = require("./tag-data");
var MemoData = (function () {
    function MemoData(json) {
        if (json === void 0) { json = {}; }
        this.title = '';
        this.isPublic = false;
        this.tags = [];
        this.tagList = '';
        this.src = '';
        this.id = +(json['id'] || 0);
        this.title = json['title'] || '';
        this.src = json['src'] || '';
        this.isPublic = json['public'] || false;
        this.tags = (json['tags'] || []).map(function (tag) { return new tag_data_1.default(tag); });
        this.tagList = this.tags.map(function (tag) { return tag.name; }).join(', ');
    }
    MemoData.prototype.isPersisted = function () {
        return this.id !== 0;
    };
    // バックエンドに投げるために整形する
    MemoData.prototype.generateParams = function () {
        var params = {};
        params['id'] = this.id;
        params['title'] = this.title;
        params['src'] = this.src;
        params['public'] = this.isPublic;
        params['tag_list'] = this.tagList;
        return params;
    };
    return MemoData;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoData;
//# sourceMappingURL=memo-data.js.map