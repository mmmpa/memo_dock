var tag_1 = require("./tag");
var Memo = (function () {
    function Memo(json) {
        if (json === void 0) { json = null; }
        this.title = '';
        this.isPublic = false;
        this.tags = [];
        this.src = '';
        if (!json) {
            return;
        }
        this.id = +json['id'];
        this.title = json['title'];
        this.src = json['src'];
        this.isPublic = json['public'];
        this.tags = json['tags'].map(function (tag) { return new tag_1.default(tag); });
    }
    return Memo;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memo;
//# sourceMappingURL=memo.js.map