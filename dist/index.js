'use strict';

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
var provider;
function setRequestProvider(p) {
  provider = p;
}
function request(props) {
  return __async(this, null, function* () {
    if (!provider) {
      throw new Error("Request provider is not initialized. Please ensure that the provider is properly configured before making requests.");
    }
    return provider(props);
  });
}
var RequestError = class _RequestError extends Error {
  constructor(message, code = 0, errorType = "unknown") {
    super(message);
    this.name = "RequestError";
    this.code = code;
    this.errorType = errorType;
    Object.setPrototypeOf(this, _RequestError.prototype);
  }
};

// src/event.ts
var EventBus = class {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
    this.onFirstSubscribeHandlers = /* @__PURE__ */ new Set();
    this.onLastSubscribeHandlers = /* @__PURE__ */ new Set();
  }
  subscribe(topic, subscriber) {
    var _a;
    const set = (_a = this.subscribers.get(topic)) != null ? _a : /* @__PURE__ */ new Set();
    const wasEmpty = set.size === 0;
    set.add(subscriber);
    this.subscribers.set(topic, set);
    if (wasEmpty) {
      this.onFirstSubscribeHandlers.forEach((fn) => fn(topic));
      this.subscribers.set(topic, set);
    }
    return () => this.unsubscribe(topic, subscriber);
  }
  unsubscribe(topic, subscriber) {
    var _a, _b;
    (_a = this.subscribers.get(topic)) == null ? void 0 : _a.delete(subscriber);
    if (!((_b = this.subscribers.get(topic)) == null ? void 0 : _b.size)) {
      this.subscribers.delete(topic);
      this.onLastSubscribeHandlers.forEach((fn) => fn(topic));
    }
  }
  dispatch(topic, event) {
    var _a;
    (_a = this.subscribers.get(topic)) == null ? void 0 : _a.forEach((subscriber) => subscriber(event).catch((error) => {
      console.error(`EventBus emit error: ${error}`);
    }));
  }
  onFirstSubscribe(onFirstSubscribeHandler) {
    this.onFirstSubscribeHandlers.add(onFirstSubscribeHandler);
    return () => this.onFirstSubscribeHandlers.delete(onFirstSubscribeHandler);
  }
  onLastSubscribe(onLastSubscribeHandler) {
    this.onLastSubscribeHandlers.add(onLastSubscribeHandler);
    return () => this.onLastSubscribeHandlers.delete(onLastSubscribeHandler);
  }
  countTopic() {
    const result = {};
    this.subscribers.forEach((subscribers, topic) => {
      result[topic] = subscribers.size;
    });
    return result;
  }
  topics() {
    return Array.from(this.subscribers.keys());
  }
  subscriberChannel(topic) {
    return new SubscriberChannel(this, topic);
  }
  dispatcherChannel(topic) {
    return new DispatcherChannel(this, topic);
  }
};
var RemoteEventBus = class extends EventBus {
  constructor(publishProvider) {
    super();
    this.publishProvider = publishProvider;
  }
  setPublishProvider(publishProvider) {
    this.publishProvider = publishProvider;
  }
  publish(topic, event) {
    if (this.publishProvider) {
      this.publishProvider(topic, event);
    } else {
      throw new Error("RemoteEventBus is not initialized. Please ensure that the instance is properly configured before making requests.");
    }
  }
  publisherChannel(topic) {
    return new PublisherChannel(this, topic);
  }
};
var DispatcherChannel = class {
  constructor(bus, topic) {
    this.topic = topic;
    this.bus = bus;
  }
  dispatch(event) {
    this.bus.dispatch(this.topic, event);
  }
};
var SubscriberChannel = class {
  constructor(bus, topic) {
    this.topic = topic;
    this.bus = bus;
  }
  subscribe(subscriber) {
    return this.bus.subscribe(this.topic, subscriber);
  }
  unsubscribe(subscriber) {
    this.bus.unsubscribe(this.topic, subscriber);
  }
};
var PublisherChannel = class {
  constructor(bus, topic) {
    this.topic = topic;
    this.bus = bus;
  }
  publish(event) {
    this.bus.publish(this.topic, event);
  }
};
var defaultRemoteEventBus = new RemoteEventBus();

exports.DispatcherChannel = DispatcherChannel;
exports.LocalizedDictionary = LocalizedDictionary;
exports.PublisherChannel = PublisherChannel;
exports.RemoteEventBus = RemoteEventBus;
exports.RequestError = RequestError;
exports.SubscriberChannel = SubscriberChannel;
exports.defaultRemoteEventBus = defaultRemoteEventBus;
exports.request = request;
exports.setRequestProvider = setRequestProvider;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map