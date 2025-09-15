export interface RpcCaller<I extends any = any, O extends any = any> {
    (input: I): Promise<O>;
    (): Promise<O>;
}

let provider: RpcCaller | undefined;

export function setRpcProvider(p: RpcCaller): void {
    provider = p;
}

export function callRpcMethod<I extends any = any, O extends any = any>(input: I): Promise<O> {
    if (!provider) {
        throw new Error('Rpc provider is not initialized. Please ensure that the provider is properly configured before making requests.');
    }
    return provider(input);
}