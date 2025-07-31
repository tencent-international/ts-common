export interface RequestProps {
  ignoreAuth?: boolean;
  method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD';
  url: string;
  data?: any;
  header?: object;
}

export interface IRequest<T extends any = any> {
  (props: RequestProps): Promise<T>;
}

let provider: IRequest | undefined;

export function setRequestProvider(p: IRequest): void {
  provider = p;
}

export async function request<T extends any = any>(props: RequestProps): Promise<T> {
  if (!provider) {
    throw new Error('Request provider is not initialized. Please ensure that the provider is properly configured before making requests.');
  }
  return provider(props);
}

export class RequestError extends Error {
  public readonly code: number;
  public readonly errorType: string;
  constructor(message: string, code = 0, errorType = 'unknown') {
    super(message);
    this.name = 'RequestError';
    this.code = code;
    this.errorType = errorType;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
