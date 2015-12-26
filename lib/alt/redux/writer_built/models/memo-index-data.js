var MemoIndexData = (function () {
    function MemoIndexData(memos, page, par, total, tagIds) {
        if (memos === void 0) { memos = []; }
        if (page === void 0) { page = 0; }
        if (par === void 0) { par = 0; }
        if (total === void 0) { total = 0; }
        if (tagIds === void 0) { tagIds = ''; }
        this.memos = memos;
        this.page = page;
        this.par = par;
        this.total = total;
        this.tagIds = tagIds;
        if (tagIds === '') {
            this.tagIds = null;
        }
        this.isSelectedTag = this.isSelectedTag.bind(this);
    }
    MemoIndexData.prototype.isSelectedTag = function () {
        return this.tagIds !== null;
    };
    MemoIndexData.prototype.clone = function () {
        return new MemoIndexData(this.memos.concat(), this.page, this.par, this.total, this.tagIds);
    };
    return MemoIndexData;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoIndexData;
//# sourceMappingURL=memo-index-data.js.map