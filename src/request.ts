export interface RequestProps {
  ignoreAuth?: boolean;
  method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD';
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IRequest<T extends any = any> {
  (props: RequestProps): Promise<T>;
}

let provider: IRequest | undefined;

export function setRequestProvider(p: IRequest): void {
  provider = p;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function request<T extends any = any>(props: RequestProps): Promise<T> {
  if (!provider) {
    throw new Error('Request provider is not initialized. Please ensure that the provider is properly configured before making requests.');
  }
  return provider(props) as Promise<T>;
}

export class RequestError extends Error {
  constructor(message: string = "Request failed") {
    super(message);
    this.name = 'RequestError';
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}

export class ResponseError extends Error {
  public readonly code: number;
  public readonly errorType: string;
  constructor(message: string, code = 0, errorType = 'unknown') {
    super(message);
    this.name = 'ResponseError';
    this.code = code;
    this.errorType = errorType;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
