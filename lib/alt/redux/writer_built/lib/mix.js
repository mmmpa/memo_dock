function mix(derivedCtor, baseCtors, exclusion) {
    if (exclusion === void 0) { exclusion = []; }
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (!include(exclusion, name)) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
    if (Object.keys) {
        Object.keys(baseCtors).forEach(function (property) {
            Object.defineProperty(derivedCtor, property, Object.getOwnPropertyDescriptor(baseCtors, property));
        });
    }
    else {
        for (var property in baseCtors) {
            if (baseCtors.hasOwnProperty(property)) {
                derivedCtor[property] = baseCtors[property];
            }
        }
    }
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