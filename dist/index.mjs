var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/dictionary.ts
var LocalizedDictionary = class {
  constructor(items) {
    this.items = items;
    this.map = items.reduce((acc, item) => {
      acc[item.value] = item;
      return acc;
    }, {});
  }
  getItem(key, locale) {
    var _a, _b, _c;
    const item = this.map[key];
    if (!item) {
      return { value: key, label: key.toString() };
    }
    const d = ((_a = item.localizedInfo) == null ? void 0 : _a[locale]) || ((_b = item.localizedInfo) == null ? void 0 : _b[""]);
    return { value: key, label: (_c = d == null ? void 0 : d.label) != null ? _c : key.toString(), tip: d == null ? void 0 : d.tip };
  }
  getItems(locale) {
    return this.items.map(({ value }) => this.getItem(value, locale));
  }
  getMap(locale) {
    return this.items.reduce((acc, item) => {
      acc[item.value] = this.getItem(item.value, locale);
      return acc;
    }, {});
  }
};

// src/request.ts
var instance;
function setInstance(i) {
  instance = i;
}
function request(props) {
  return __async(this, null, function* () {
    if (!instance) {
      throw new Error("Request instance is not initialized. Please ensure that the instance is properly configured before making requests.");
    }
    return instance(props);
  });
}

export { LocalizedDictionary, request, setInstance };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map