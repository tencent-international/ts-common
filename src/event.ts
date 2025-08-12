

export class EventBus {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private subscribers: Map<string, Set<(event: any) => Promise<void>>> = new Map();
    private onFirstSubscribeHandlers: Set<(topic: string) => void> = new Set();
    private onLastSubscribeHandlers: Set<(topic: string) => void> = new Set();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public subscribe(topic: string, subscriber: (event: any) => Promise<void>): () => void {
        const set = this.subscribers.get(topic) ?? new Set();
        const wasEmpty = set.size === 0;
        set.add(subscriber);
        this.subscribers.set(topic, set);
        if (wasEmpty) {
            this.onFirstSubscribeHandlers.forEach(fn => fn(topic));
            this.subscribers.set(topic, set);
        }
        return () => this.unsubscribe(topic, subscriber);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public unsubscribe(topic: string, subscriber: (event: any) => Promise<void>): void {
        this.subscribers.get(topic)?.delete(subscriber);
        if (!this.subscribers.get(topic)?.size) {
            this.subscribers.delete(topic);
            this.onLastSubscribeHandlers.forEach(fn => fn(topic));
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public dispatch(topic: string, event: any): void {
        this.subscribers.get(topic)?.forEach(subscriber => subscriber(event).catch(error => {
            // eslint-disable-next-line no-console
            console.error(`EventBus emit error: ${error}`);
        }));
    }

    public onFirstSubscribe(onFirstSubscribeHandler: (topic: string) => void): () => void {
        this.onFirstSubscribeHandlers.add(onFirstSubscribeHandler);
        return () => this.onFirstSubscribeHandlers.delete(onFirstSubscribeHandler);
    }

    public onLastSubscribe(onLastSubscribeHandler: (topic: string) => void): () => void {
        this.onLastSubscribeHandlers.add(onLastSubscribeHandler);
        return () => this.onLastSubscribeHandlers.delete(onLastSubscribeHandler);
    }

    public countTopic(): Record<string, number> {
        const result: Record<string, number> = {};
        this.subscribers.forEach((subscribers, topic) => {
            result[topic] = subscribers.size;
        });
        return result;
    }

    public topics(): string[] {
        return Array.from(this.subscribers.keys());
    }

    public subscriberChannel<T>(topic: string): SubscriberChannel<T> {
        return new SubscriberChannel<T>(this, topic);
    }

    public dispatcherChannel<T>(topic: string): DispatcherChannel<T> {
        return new DispatcherChannel<T>(this, topic);
    }

}

export class RemoteEventBus extends EventBus {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private publishProvider?: (topic: string, event: any) => void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(publishProvider?: (topic: string, event: any) => void) {
        super();
        this.publishProvider = publishProvider;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public setPublishProvider(publishProvider: (topic: string, event: any) => void): void {
        this.publishProvider = publishProvider;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public publish(topic: string, event: any): void {
        if (this.publishProvider) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.publishProvider(topic, event as any);
        } else {
            throw new Error('RemoteEventBus is not initialized. Please ensure that the instance is properly configured before making requests.');
        }
    }

    public publisherChannel<T>(topic: string): PublisherChannel<T> {
        return new PublisherChannel<T>(this, topic);
    }
}

export class DispatcherChannel<T> {
    public readonly topic: string;
    private readonly bus: EventBus;
    constructor(bus: EventBus, topic: string) {
        this.topic = topic;
        this.bus = bus;
    }

     
    public dispatch(event: T): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.bus.dispatch(this.topic, event as any);
    }
}

export class SubscriberChannel<T> {
    public readonly topic: string;
    private readonly bus: EventBus;
    constructor(bus: EventBus, topic: string) {
        this.topic = topic;
        this.bus = bus;
    }

     
    public subscribe(subscriber: (event: T) => Promise<void>): () => void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.bus.subscribe(this.topic, subscriber as any);
    }

     
    public unsubscribe(subscriber: (event: T) => Promise<void>): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.bus.unsubscribe(this.topic, subscriber as any);
    }
}

export class PublisherChannel<T> {
    public readonly topic: string;
    private readonly bus: RemoteEventBus;
    constructor(bus: RemoteEventBus, topic: string) {
        this.topic = topic;
        this.bus = bus;
    }

     
    public publish(event: T): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.bus.publish(this.topic, event as any);
    }
}

export const defaultRemoteEventBus = new RemoteEventBus()
