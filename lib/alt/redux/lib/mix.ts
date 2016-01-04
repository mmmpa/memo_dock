export default function mix(derivedCtor:any, baseCtors:any[], exclusion:string[] = []) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if(!include(exclusion, name)){
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });

  if (Object.keys) {
    Object.keys(baseCtors).forEach(function (property) {
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

function include(a:string[], b:string):boolean {
  if(a.length === 0){
    return false;
  }
  for (let i = a.length; i--;) {
    if (a[i] === b) {
      return true;
    }
  }
  return false;
}