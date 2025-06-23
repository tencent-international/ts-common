export interface RequestProps {
    ignoreAuth?: boolean;
    method: string;
    url: string;
    data?: any;
    query?: object;
    header?: object;
  }
  
  export interface IRequest<T extends any = any> {
    (props: RequestProps): Promise<T>;
  }
  
  let instance: IRequest | undefined;
  
  export function useRequest(i: IRequest): void {
    instance = i;
  }
  
  async function request<T extends any = any>(props: RequestProps): Promise<T> {
    if (!instance) {
      throw new Error('Request instance is not initialized. Please ensure that the instance is properly configured before making requests.');
    }
    return instance(props);
  }
  export default request;