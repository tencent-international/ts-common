interface LocalizedDictionaryItem<T extends string | number = string> {
    value: T;
    localizedInfo?: Partial<Record<BasicTypes.Locale, { label: string; tip?: string }>>;
  }
  
  export type LabeledDictionaryItem<T extends string | number> = {
    value: T;
    label: string;
    tip?: string;
  };
  

export class LocalizedDictionary<T extends string | number = string> {
    private readonly items: LocalizedDictionaryItem<T>[];
    private readonly map: Record<T, LocalizedDictionaryItem<T>>;
    constructor(items: LocalizedDictionaryItem<T>[]) {
      this.items = items;
      this.map = items.reduce((acc, item) => {
        acc[item.value as T] = item;
        return acc;
      }, {} as Record<T, LocalizedDictionaryItem<T>>);
    }
  
    getItem(key: T, locale: BasicTypes.Locale): LabeledDictionaryItem<T> {
      const item = this.map[key];
      if (!item) {
        return { value: key, label: key.toString() };
      }
      const d = item.localizedInfo?.[locale] || item.localizedInfo?.['']; //default locale
      return { value: key, label: d?.label ?? key.toString(), tip: d?.tip };
    }
  
    getItems(locale: BasicTypes.Locale): LabeledDictionaryItem<T>[] {
      return this.items.map(({ value }) => this.getItem(value, locale));
    }
  
    getMap(locale: BasicTypes.Locale): Record<T, LabeledDictionaryItem<T>> {
      return this.items.reduce((acc, item) => {
        acc[item.value] = this.getItem(item.value, locale);
        return acc;
      }, {} as Record<T, LabeledDictionaryItem<T>>);
    }
  }
  