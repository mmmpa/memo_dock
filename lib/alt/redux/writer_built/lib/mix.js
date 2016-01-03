function mix(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        console.log(baseCtor.prototype);
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
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
//# sourceMappingURL=mix.js.map