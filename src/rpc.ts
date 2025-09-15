export interface RpcCaller<T extends any = any, U extends any = any> {
    (path: string, params: U): Promise<T>;
    (path: string,): Promise<T>;
}

let provider: RpcCaller | undefined;

export function setRpcProvider(p: RpcCaller): void {
    provider = p;
}

export function callRpcMethod<T extends any = any, U extends any = any>(path: string, params?: U): Promise<T> {
    if (!provider) {
        throw new Error('Rpc provider is not initialized. Please ensure that the provider is properly configured before making requests.');
    }
    return provider(path, params);
}