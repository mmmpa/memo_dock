(function (Login) {
    Login[Login["Request"] = 0] = "Request";
    Login[Login["RequestRetry"] = 1] = "RequestRetry";
    Login[Login["Wait"] = 2] = "Wait";
    Login[Login["LoggedIn"] = 3] = "LoggedIn";
    Login[Login["LoggedOut"] = 4] = "LoggedOut";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
(function (Memo) {
    Memo[Memo["Index"] = 0] = "Index";
    Memo[Memo["Edit"] = 1] = "Edit";
    Memo[Memo["Create"] = 2] = "Create";
    Memo[Memo["Delete"] = 3] = "Delete";
})(exports.Memo || (exports.Memo = {}));
var Memo = exports.Memo;
//# sourceMappingURL=action-types.js.map