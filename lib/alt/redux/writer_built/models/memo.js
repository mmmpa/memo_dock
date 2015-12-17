var tag_1 = require("./tag");
var Memo = (function () {
    function Memo(json) {
        if (json === void 0) { json = null; }
        this.title = '';
        this.isPublic = false;
        this.tags = [];
        this.tagList = '';
        this.src = '';
        if (!json) {
            return;
        }
        this.id = +json['id'];
        this.title = json['title'];
        this.src = json['src'];
        this.isPublic = json['public'];
        this.tags = json['tags'].map(function (tag) { return new tag_1.default(tag); });
        this.tagList = this.tags.map(function (tag) { return tag.name; }).join(', ');
    }
    Memo.prototype.isPersisted = function () {
        return this.id !== undefined;
    };
    Memo.prototype.generateParams = function () {
        var params = {};
        params['id'] = this.id;
        params['title'] = this.title;
        params['src'] = this.src;
        params['public'] = this.isPublic;
        params['tag_list'] = this.tagList;
        return params;
    };
    return Memo;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map