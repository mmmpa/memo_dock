export default function mix(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    console.log(baseCtor.prototype)
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });

  if (Object.keys) {
    Object.keys(baseCtors).forEach(function(property) {
      Object.defineProperty(derivedCtor, property, Object.getOwnPropertyDescriptor(baseCtors, property));
    });
  } else {
    for (var property in baseCtors) {
      if (baseCtors.hasOwnProperty(property)) {
        derivedCtor[property] = baseCtors[property];
      }
    }
  }
}