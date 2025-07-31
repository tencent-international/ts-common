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
declare function setRequestProvider(p: IRequest): void;
declare function request<T extends any = any>(props: RequestProps): Promise<T>;
declare class RequestError extends Error {
    readonly code: number;
    readonly errorType: string;
    constructor(message: string, code?: number, errorType?: string);
}

declare class EventBus {
    private subscribers;
    private onFirstSubscribeHandlers;
    private onLastSubscribeHandlers;
    subscribe(topic: string, subscriber: (event: any) => Promise<void>): () => void;
    unsubscribe(topic: string, subscriber: (event: any) => Promise<void>): void;
    dispatch(topic: string, event: any): void;
    onFirstSubscribe(onFirstSubscribeHandler: (topic: string) => void): () => void;
    onLastSubscribe(onLastSubscribeHandler: (topic: string) => void): () => void;
    countTopic(): Record<string, number>;
    topics(): string[];
    subscriberChannel<T>(topic: string): SubscriberChannel<T>;
    dispatcherChannel<T>(topic: string): DispatcherChannel<T>;
}
declare class RemoteEventBus extends EventBus {
    private publishProvider?;
    constructor(publishProvider?: (topic: string, event: any) => void);
    setPublishProvider(publishProvider: (topic: string, event: any) => void): void;
    publish(topic: string, event: any): void;
    publisherChannel<T>(topic: string): PublisherChannel<T>;
}
declare class DispatcherChannel<T> {
    readonly topic: string;
    private readonly bus;
    constructor(bus: EventBus, topic: string);
    dispatch(event: T): void;
}
declare class SubscriberChannel<T> {
    readonly topic: string;
    private readonly bus;
    constructor(bus: EventBus, topic: string);
    subscribe(subscriber: (event: T) => Promise<void>): () => void;
    unsubscribe(subscriber: (event: T) => Promise<void>): void;
}
declare class PublisherChannel<T> {
    readonly topic: string;
    private readonly bus;
    constructor(bus: RemoteEventBus, topic: string);
    publish(event: T): void;
}
declare const defaultRemoteEventBus: RemoteEventBus;

export { DispatcherChannel, type IRequest, type LabeledDictionaryItem, LocalizedDictionary, PublisherChannel, RemoteEventBus, RequestError, type RequestProps, SubscriberChannel, defaultRemoteEventBus, request, setRequestProvider };
