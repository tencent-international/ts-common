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

type DefaultBaseHeader = BasicTypes.DefaultBaseHeader;
type DefaultResponseWrapper<T> = BasicTypes.DefaultResponseWrapper<T>;
type ErrorDetails = BasicTypes.ErrorDetails;
type PublicUploadCredentials = BasicTypes.PublicUploadCredentials;
type Request = BasicTypes.Request;
type SigningRequest = BasicTypes.SigningRequest;
type ContentType = BasicTypes.ContentType;
type CountryCode = BasicTypes.CountryCode;
type ErrType = BasicTypes.ErrType;
type Gender = BasicTypes.Gender;
type Locale = BasicTypes.Locale;
type Platform = BasicTypes.Platform;

export { type ContentType, type CountryCode, type DefaultBaseHeader, type DefaultResponseWrapper, type ErrType, type ErrorDetails, type Gender, type IRequest, type LabeledDictionaryItem, type Locale, LocalizedDictionary, type Platform, type PublicUploadCredentials, type Request, type RequestProps, type SigningRequest, useRequest };
