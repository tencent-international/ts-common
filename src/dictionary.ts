export type Locale = '' | 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'en-GB' | 'en-AU' | 'en-CA' | 'en-IN' | 'fr-FR' | 'fr-CA' | 'de-DE' | 'fil-PH' | 'de-CH' | 'es-ES' | 'es-MX' | 'es-US' | 'ja-JP' | 'ko-KR' | 'ru-RU' | 'pt-BR' | 'pt-PT' | 'ar-SA' | 'ar-EG' | 'hi-IN' | 'it-IT' | 'it-CH' | 'nl-NL' | 'nl-BE' | 'pl-PL' | 'vi-VN' | 'th-TH' | 'el-GR' | 'tr-TR' | 'sv-SE';


export interface LocalizedDictionaryItem<T extends string | number = string> {
    value: T;
    localizedInfo?: Partial<Record<Locale, { label: string; tip?: string }>>;
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
  
    getItem(key: T, locale: Locale): LabeledDictionaryItem<T> {
      const item = this.map[key];
      if (!item) {
        return { value: key, label: key.toString() };
      }
      const d = item.localizedInfo?.[locale] || item.localizedInfo?.['']; //default locale
      return { value: key, label: d?.label ?? key.toString(), tip: d?.tip };
    }
  
    getItems(locale: Locale): LabeledDictionaryItem<T>[] {
      return this.items.map(({ value }) => this.getItem(value, locale));
    }
  
    getMap(locale: Locale): Record<T, LabeledDictionaryItem<T>> {
      return this.items.reduce((acc, item) => {
        acc[item.value] = this.getItem(item.value, locale);
        return acc;
      }, {} as Record<T, LabeledDictionaryItem<T>>);
    }
  }
  