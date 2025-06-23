// 导出所有字典相关功能
export * from './dictionary';

// 导出所有请求相关功能  
export * from './request';

// 重新导出 BasicTypes 中的常用类型，方便按需导入
// 注意：BasicTypes 作为全局命名空间仍然可以直接使用
export type DefaultBaseHeader = BasicTypes.DefaultBaseHeader;
export type DefaultResponseWrapper<T> = BasicTypes.DefaultResponseWrapper<T>;
export type ErrorDetails = BasicTypes.ErrorDetails;
export type PublicUploadCredentials = BasicTypes.PublicUploadCredentials;
export type Request = BasicTypes.Request;
export type SigningRequest = BasicTypes.SigningRequest;
export type ContentType = BasicTypes.ContentType;
export type CountryCode = BasicTypes.CountryCode;
export type ErrType = BasicTypes.ErrType;
export type Gender = BasicTypes.Gender;
export type Locale = BasicTypes.Locale;
export type Platform = BasicTypes.Platform;
