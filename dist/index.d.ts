interface LocalizedDictionaryItem<T extends string | number = string> {
    value: T;
    localizedInfo?: Partial<Record<BasicTypes.Locale, {
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
    getItem(key: T, locale: BasicTypes.Locale): LabeledDictionaryItem<T>;
    getItems(locale: BasicTypes.Locale): LabeledDictionaryItem<T>[];
    getMap(locale: BasicTypes.Locale): Record<T, LabeledDictionaryItem<T>>;
}

interface RequestProps {
    ignoreAuth?: boolean;
    method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD';
    url: string;
    data?: any;
    header?: object;
}
interface IRequest<T extends any = any> {
    (props: RequestProps): Promise<T>;
}
declare function setInstance(i: IRequest): void;
declare function request<T extends any = any>(props: RequestProps): Promise<T>;

export { type IRequest, type LabeledDictionaryItem, LocalizedDictionary, type RequestProps, request, setInstance };
