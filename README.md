# @tencent-international/ts-common

TypeScript 通用类型和工具库

## 安装

```bash
npm install @tencent-international/ts-common
# 或
yarn add @tencent-international/ts-common
```

## 使用方法

### 1. 全局类型使用

安装后，`BasicTypes` 会自动全局可用，无需导入：

```typescript
// 直接使用 BasicTypes 命名空间中的类型
const header: BasicTypes.DefaultBaseHeader = {
  Authorization: 'Bearer token',
  'User-Agent': 'MyApp/1.0',
  'Accept-Language': 'zh-CN',
  'X-Locale': 'zh-CN'
};

const response: BasicTypes.DefaultResponseWrapper<string> = {
  success: true,
  data: 'Hello World'
};

const contentType: BasicTypes.ContentType = 'application/json';
const countryCode: BasicTypes.CountryCode = '86';
const gender: BasicTypes.Gender = 'male';
const locale: BasicTypes.Locale = 'zh-CN';
const platform: BasicTypes.Platform = 'pc';
```

### 2. 模块导入使用

也可以导入其他模块：

```typescript
import { dictionary, request } from '@tencent-international/ts-common';

// 使用导入的功能
```

## 开发

### 构建

```bash
yarn build
```

### 开发模式

```bash
yarn dev
```

### 发布

```bash
# 构建并发布到 npm
yarn publish
```

## 类型说明

### BasicTypes 命名空间

包含以下类型定义：

- `DefaultBaseHeader`: 默认请求头接口
- `DefaultResponseWrapper<T>`: 默认响应包装器
- `ErrorDetails`: 错误详情接口
- `PublicUploadCredentials`: 公共上传凭证
- `Request`: 请求接口
- `SigningRequest`: 签名请求接口
- `ContentType`: 内容类型
- `CountryCode`: 国家代码
- `ErrType`: 错误类型
- `Gender`: 性别
- `Locale`: 语言环境
- `Platform`: 平台类型

## 发布流程

1. 更新版本号：`yarn version patch|minor|major`
2. 构建项目：`yarn build`
3. 发布到 npm：`yarn publish`

## 注意事项

- `BasicTypes.d.ts` 文件会被包含在发布包中，确保全局类型可用
- 使用 `tsconfig.json` 中的 `types` 字段来全局引用类型
- 支持 CommonJS 和 ESM 两种模块格式
