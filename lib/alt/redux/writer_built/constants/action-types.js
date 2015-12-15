(function (Login) {
    Login[Login["Request"] = 1] = "Request";
    Login[Login["RequestRetry"] = 2] = "RequestRetry";
    Login[Login["Wait"] = 3] = "Wait";
    Login[Login["LoggedIn"] = 4] = "LoggedIn";
    Login[Login["LoggedOut"] = 5] = "LoggedOut";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
(function (Memo) {
    Memo[Memo["Index"] = 101] = "Index";
    Memo[Memo["WaitIndex"] = 105] = "WaitIndex";
    Memo[Memo["Edit"] = 102] = "Edit";
    Memo[Memo["WaitEdit"] = 106] = "WaitEdit";
    Memo[Memo["Create"] = 103] = "Create";
    Memo[Memo["Delete"] = 104] = "Delete";
})(exports.Memo || (exports.Memo = {}));
var Memo = exports.Memo;
//# sourceMappingURL=action-types.js.map