// 导出所有字典相关功能
export * from './dictionary';

// 导出所有请求相关功能  
export * from './request';

// 显式导出 request 函数，确保 tree-shaking 不会误删相关代码
export { default as request } from './request';

// BasicTypes 不再从主包导出，只能通过 /basic-types 子路径导入
