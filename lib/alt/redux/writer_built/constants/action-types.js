(function (Login) {
    Login[Login["Request"] = 1] = "Request";
    Login[Login["RequestRetry"] = 2] = "RequestRetry";
    Login[Login["Wait"] = 3] = "Wait";
    Login[Login["LoggedIn"] = 4] = "LoggedIn";
    Login[Login["LoggedOut"] = 5] = "LoggedOut";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
(function (Memo) {
    Memo[Memo["ShowIndex"] = 101] = "ShowIndex";
    Memo[Memo["WaitIndex"] = 105] = "WaitIndex";
    Memo[Memo["StartEditing"] = 102] = "StartEditing";
    Memo[Memo["WaitEditing"] = 106] = "WaitEditing";
    Memo[Memo["FinishRendering"] = 107] = "FinishRendering";
    Memo[Memo["Create"] = 103] = "Create";
    Memo[Memo["Delete"] = 104] = "Delete";
    Memo[Memo["SuccessSaving"] = 108] = "SuccessSaving";
    Memo[Memo["FailSaving"] = 109] = "FailSaving";
    Memo[Memo["StartSaving"] = 110] = "StartSaving";
})(exports.Memo || (exports.Memo = {}));
var Memo = exports.Memo;
//# sourceMappingURL=action-types.js.map