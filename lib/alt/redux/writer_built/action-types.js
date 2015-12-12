exports.MEMO_CREATION = 'MEMO_CREATION';
exports.MEMO_EDIT = 'MEMO_EDIT';
exports.MEMO_INDEX = 'MEMO_INDEX';
(function (Login) {
    Login[Login["Request"] = 0] = "Request";
    Login[Login["RequestRetry"] = 1] = "RequestRetry";
    Login[Login["Wait"] = 2] = "Wait";
    Login[Login["Success"] = 3] = "Success";
    Login[Login["Logout"] = 4] = "Logout";
})(exports.Login || (exports.Login = {}));
var Login = exports.Login;
//# sourceMappingURL=action-types.js.map