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

let instance: IRequest | undefined;

export function setRequestInstance(i: IRequest): void {
  instance = i;
}

export async function request<T extends any = any>(props: RequestProps): Promise<T> {
  if (!instance) {
    throw new Error('Request instance is not initialized. Please ensure that the instance is properly configured before making requests.');
  }
  return instance(props);
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
