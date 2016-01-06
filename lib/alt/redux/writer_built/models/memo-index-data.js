var memo_data_1 = require("./memo-data");
var MemoIndexData = (function () {
    function MemoIndexData(body, header) {
        this.memos = body.map(function (memo) { return new memo_data_1.default(memo); });
        this.page = +header['page'];
        this.par = +header['par'];
        this.total = +header['total-pages'];
        this.tagIds = header['tag-ids'];
        if (this.tagIds === '') {
            this.tagIds = null;
        }
        this.isSelectedTag = this.isSelectedTag.bind(this);
    }
    MemoIndexData.prototype.isSelectedTag = function () {
        return this.tagIds !== null;
    };
    MemoIndexData.prototype.clone = function () {
        return this;
    };
    return MemoIndexData;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexData;
//# sourceMappingURL=memo-index-data.js.map