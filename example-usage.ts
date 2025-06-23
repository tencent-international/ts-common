// 示例：如何使用全局的 BasicTypes
// 注意：这个文件不需要导入 BasicTypes，因为它是全局可用的

// 使用 BasicTypes 中的类型
const header: BasicTypes.DefaultBaseHeader = {
  Authorization: 'Bearer token',
  'User-Agent': 'MyApp/1.0',
  'Accept-Language': 'zh-CN',
  'X-Locale': 'zh-CN',
  'X-Timestamp': Date.now(),
  'X-Request-Id': 'req-123',
  'X-Device-Id': 'device-456',
  'X-Real-IP': '192.168.1.1',
  'X-IP-Country': '86',
  'X-IP-Region': 'Beijing',
  'X-IP-City': 'Beijing',
  'X-Sign': 'signature'
};

// 使用其他类型
const response: BasicTypes.DefaultResponseWrapper<string> = {
  success: true,
  data: 'Hello World'
};

const errorResponse: BasicTypes.DefaultResponseWrapper<never> = {
  success: false,
  error: {
    code: 404,
    message: 'Not Found',
    type: 'not_found'
  }
};

// 使用枚举类型
const contentType: BasicTypes.ContentType = 'application/json';
const countryCode: BasicTypes.CountryCode = '86';
const gender: BasicTypes.Gender = 'male';
const locale: BasicTypes.Locale = 'zh-CN';
const platform: BasicTypes.Platform = 'pc';

console.log('BasicTypes 全局可用！'); 