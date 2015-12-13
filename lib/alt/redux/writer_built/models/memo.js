var tag_1 = require("./tag");
var Memo = (function () {
    function Memo(json) {
        this.id = +json['id'];
        this.title = json['title'];
        this.isPublic = json['public'];
        this.tags = json['tags'].map(function (tag) { return new tag_1.default(tag); });
    }
    return Memo;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map