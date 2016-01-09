function mix(derivedCtor, baseCtors, exclusion) {
    if (exclusion === void 0) { exclusion = []; }
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (!include(exclusion, name)) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mix;
function include(a, b) {
    if (a.length === 0) {
        return false;
    }
    for (var i = a.length; i--;) {
        if (a[i] === b) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=mix.js.map