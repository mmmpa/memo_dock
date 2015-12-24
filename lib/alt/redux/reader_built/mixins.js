var memo_data_1 = require("./models/memo-data");
var MemoWork = (function () {
    function MemoWork() {
    }
    MemoWork.setTitle = function (title) {
        document.title = title;
    };
    MemoWork.getPortal = function () {
        var memo = new memo_data_1.default();
        try {
            var title = this.nojs.getElementsByTagName('h1')[0].innerHTML;
            var html = this.nojs.getElementsByTagName('section')[0].innerHTML;
            memo.title = title;
            memo.html = html;
        }
        catch (e) {
        }
        return memo;
    };
    return MemoWork;
})();
exports.MemoWork = MemoWork;
//# sourceMappingURL=mixins.js.map