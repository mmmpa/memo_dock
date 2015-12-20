var AppState = (function () {
    function AppState() {
    }
    return AppState;
})();
exports.AppState = AppState;
(function (LoginState) {
    LoginState[LoginState["Ready"] = 101] = "Ready";
    LoginState[LoginState["Request"] = 102] = "Request";
    LoginState[LoginState["Wait"] = 103] = "Wait";
    LoginState[LoginState["Invalid"] = 104] = "Invalid";
    LoginState[LoginState["LoggedIn"] = 105] = "LoggedIn";
})(exports.LoginState || (exports.LoginState = {}));
var LoginState = exports.LoginState;
(function (Context) {
    Context[Context["Login"] = 1] = "Login";
    Context[Context["MemoEdit"] = 2] = "MemoEdit";
    Context[Context["MemoIndex"] = 3] = "MemoIndex";
    Context[Context["Calm"] = 0] = "Calm";
})(exports.Context || (exports.Context = {}));
var Context = exports.Context;
(function (EditMemoState) {
    EditMemoState[EditMemoState["Ready"] = 0] = "Ready";
    EditMemoState[EditMemoState["Loading"] = 1] = "Loading";
    EditMemoState[EditMemoState["Saving"] = 2] = "Saving";
})(exports.EditMemoState || (exports.EditMemoState = {}));
var EditMemoState = exports.EditMemoState;
(function (MemoIndexState) {
    MemoIndexState[MemoIndexState["Ready"] = 0] = "Ready";
    MemoIndexState[MemoIndexState["Wait"] = 1] = "Wait";
})(exports.MemoIndexState || (exports.MemoIndexState = {}));
var MemoIndexState = exports.MemoIndexState;
//# sourceMappingURL=status.js.map