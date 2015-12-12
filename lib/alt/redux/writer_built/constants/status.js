(function (Login) {
    Login[Login["Ready"] = 0] = "Ready";
    Login[Login["Request"] = 1] = "Request";
    Login[Login["Wait"] = 2] = "Wait";
    Login[Login["Invalid"] = 3] = "Invalid";
    Login[Login["LoggedIn"] = 4] = "LoggedIn";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
(function (Context) {
    Context[Context["Login"] = 0] = "Login";
    Context[Context["MemoEdit"] = 1] = "MemoEdit";
    Context[Context["MemoIndex"] = 2] = "MemoIndex";
})(exports.Context || (exports.Context = {}));
var Context = exports.Context;
//# sourceMappingURL=status.js.map