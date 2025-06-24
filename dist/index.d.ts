type Locale = '' | 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'en-GB' | 'en-AU' | 'en-CA' | 'en-IN' | 'fr-FR' | 'fr-CA' | 'de-DE' | 'fil-PH' | 'de-CH' | 'es-ES' | 'es-MX' | 'es-US' | 'ja-JP' | 'ko-KR' | 'ru-RU' | 'pt-BR' | 'pt-PT' | 'ar-SA' | 'ar-EG' | 'hi-IN' | 'it-IT' | 'it-CH' | 'nl-NL' | 'nl-BE' | 'pl-PL' | 'vi-VN' | 'th-TH' | 'el-GR' | 'tr-TR' | 'sv-SE';

interface LocalizedDictionaryItem<T extends string | number = string> {
    value: T;
    localizedInfo?: Partial<Record<Locale, {
        label: string;
        tip?: string;
    }>>;
}
type LabeledDictionaryItem<T extends string | number> = {
    value: T;
    label: string;
    tip?: string;
};
declare class LocalizedDictionary<T extends string | number = string> {
    private readonly items;
    private readonly map;
    constructor(items: LocalizedDictionaryItem<T>[]);
    getItem(key: T, locale: Locale): LabeledDictionaryItem<T>;
    getItems(locale: Locale): LabeledDictionaryItem<T>[];
    getMap(locale: Locale): Record<T, LabeledDictionaryItem<T>>;
}

interface RequestProps {
    ignoreAuth?: boolean;
    method: string;
    url: string;
    data?: any;
    query?: object;
    header?: object;
}
interface IRequest<T extends any = any> {
    (props: RequestProps): Promise<T>;
}
declare function useRequest(i: IRequest): void;
declare function request<T extends any = any>(props: RequestProps): Promise<T>;

export { type IRequest, type LabeledDictionaryItem, LocalizedDictionary, type RequestProps, request, useRequest };
