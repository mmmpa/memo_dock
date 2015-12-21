var AppState = (function () {
    function AppState() {
    }
    return AppState;
})();
exports.AppState = AppState;
(function (TagState) {
    TagState[TagState["Ready"] = 0] = "Ready";
    TagState[TagState["Wait"] = 1] = "Wait";
})(exports.TagState || (exports.TagState = {}));
var TagState = exports.TagState;
(function (MemoState) {
    MemoState[MemoState["Ready"] = 0] = "Ready";
    MemoState[MemoState["Wait"] = 1] = "Wait";
})(exports.MemoState || (exports.MemoState = {}));
var MemoState = exports.MemoState;
//# sourceMappingURL=status.js.map