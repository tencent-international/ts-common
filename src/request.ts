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
  
  export function setInstance(i: IRequest): void {
    instance = i;
  }
  
  export async function request<T extends any = any>(props: RequestProps): Promise<T> {
    if (!instance) {
      throw new Error('Request instance is not initialized. Please ensure that the instance is properly configured before making requests.');
    }
    return instance(props);
  }