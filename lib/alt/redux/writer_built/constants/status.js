(function (Login) {
    Login[Login["Ready"] = 101] = "Ready";
    Login[Login["Request"] = 102] = "Request";
    Login[Login["Wait"] = 103] = "Wait";
    Login[Login["Invalid"] = 104] = "Invalid";
    Login[Login["LoggedIn"] = 105] = "LoggedIn";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
(function (Context) {
    Context[Context["Login"] = 1] = "Login";
    Context[Context["MemoEdit"] = 2] = "MemoEdit";
    Context[Context["MemoIndex"] = 3] = "MemoIndex";
    Context[Context["Calm"] = 0] = "Calm";
})(exports.Context || (exports.Context = {}));
var Context = exports.Context;
//# sourceMappingURL=status.js.map