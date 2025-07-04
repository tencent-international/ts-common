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
function useRequest(i) {
}

export { LocalizedDictionary, useRequest };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map